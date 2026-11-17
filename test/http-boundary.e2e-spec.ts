import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Server } from 'node:http';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { ImpedimentosSaidaController } from '../src/modules/occupancy/controllers/impedimentos-saida.controller.js';
import { IndicadoresController } from '../src/modules/occupancy/controllers/indicadores.controller.js';
import { CategoriasVagaController } from '../src/modules/occupancy/controllers/categorias-vaga.controller.js';
import { PatiosController } from '../src/modules/occupancy/controllers/patios.controller.js';
import { PermanenciasController } from '../src/modules/occupancy/controllers/permanencias.controller.js';
import { TarifasController } from '../src/modules/occupancy/controllers/tarifas.controller.js';
import { ParkingOperationsService } from '../src/modules/occupancy/services/parking-operations.service.js';
import { MotoristasController } from '../src/modules/orders/controllers/motoristas.controller.js';
import { ReservasController } from '../src/modules/orders/controllers/reservas.controller.js';
import { OrdersService } from '../src/modules/orders/services/orders.service.js';

const ordersService = {
  cadastrarMotorista: vi.fn(() =>
    Promise.resolve({
      motoristaId: 'driver-1',
      nome: 'Ana',
      email: 'ana@example.com',
    }),
  ),
  cadastrarVeiculo: vi.fn(() =>
    Promise.resolve({
      veiculoId: 'vehicle-1',
      motoristaId: 'driver-1',
      placa: 'ABC1234',
      tipo: 'CARRO',
    }),
  ),
  reservarVaga: vi.fn(() => Promise.resolve({ reservaId: 'reservation-1' })),
  cancelarReserva: vi.fn(() => Promise.resolve({ reservaId: 'reservation-1' })),
};

const parkingOperationsService = {
  criarPatio: vi.fn(() =>
    Promise.resolve({ patioId: 'patio-1', nome: 'Central' }),
  ),
  criarVaga: vi.fn(() => Promise.resolve({ vagaId: 'spot-1', codigo: 'A-01' })),
  listarVagas: vi.fn(() => Promise.resolve([])),
  definirTarifa: vi.fn(() => Promise.resolve({ tarifaId: 'tariff-1' })),
  tarifaVigente: vi.fn(() => Promise.resolve({ tarifaId: 'tariff-1' })),
  criarCategoria: vi.fn(() => Promise.resolve({ categoriaId: 'category-1' })),
  listarCategorias: vi.fn(() => Promise.resolve([])),
  associarCategoria: vi.fn(() => Promise.resolve({ vagaId: 'spot-1' })),
  registrarEntrada: vi.fn(() =>
    Promise.resolve({
      registro: {
        registroId: 'stay-1',
        placa: 'ABC1234',
        horarioEntrada: new Date('2026-01-01T10:00:00.000Z'),
      },
      vaga: { vagaId: 'spot-1', codigo: 'A-01' },
    }),
  ),
  concluirSaida: vi.fn(() => Promise.resolve({ registroId: 'stay-1' })),
  resolverImpedimentoSaida: vi.fn(() =>
    Promise.resolve({
      impedimentoId: 'impediment-1',
      registroId: 'stay-1',
    }),
  ),
  indicadores: vi.fn(() => Promise.resolve({ totalVagas: 0 })),
};

describe('HTTP boundary for UC01-UC10 (service mocked)', () => {
  let app: INestApplication<Server>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        MotoristasController,
        ReservasController,
        PatiosController,
        TarifasController,
        CategoriasVagaController,
        PermanenciasController,
        ImpedimentosSaidaController,
        IndicadoresController,
      ],
      providers: [
        { provide: OrdersService, useValue: ordersService },
        {
          provide: ParkingOperationsService,
          useValue: parkingOperationsService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('UC01 accepts a driver DTO and delegates only declared properties', async () => {
    await request(app.getHttpServer())
      .post('/motoristas')
      .send({
        nome: 'Ana',
        email: 'ana@example.com',
        propriedadeDesconhecida: 'removida',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          motoristaId: 'driver-1',
          nome: 'Ana',
          email: 'ana@example.com',
        });
      });

    expect(ordersService.cadastrarMotorista).toHaveBeenCalledWith(
      'Ana',
      'ana@example.com',
    );
  });

  it('UC01 accepts a vehicle DTO and preserves optional type behavior', async () => {
    await request(app.getHttpServer())
      .post('/motoristas/driver-1/veiculos')
      .send({ placa: 'ABC-1234', propriedadeDesconhecida: true })
      .expect(201);

    expect(ordersService.cadastrarVeiculo).toHaveBeenCalledWith(
      'driver-1',
      'ABC-1234',
      undefined,
    );
  });

  it('UC02 delegates reservation fields from a valid DTO', async () => {
    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        patioId: 'patio-1',
        motoristaId: 'driver-1',
        veiculoId: 'vehicle-1',
      })
      .expect(201);

    expect(ordersService.reservarVaga).toHaveBeenCalledWith(
      'patio-1',
      'driver-1',
      'vehicle-1',
      undefined,
    );
  });

  it('UC03 delegates cancellation by route parameter', async () => {
    await request(app.getHttpServer())
      .post('/reservas/reservation-1/cancelar')
      .expect(201);

    expect(ordersService.cancelarReserva).toHaveBeenCalledWith('reservation-1');
  });

  it('UC04 delegates entry and returns the Location header', async () => {
    await request(app.getHttpServer())
      .post('/patios/patio-1/permanencias')
      .send({ placa: 'ABC-1234' })
      .expect(201)
      .expect(({ body, headers }) => {
        expect(body).toMatchObject({
          registroId: 'stay-1',
          patioId: 'patio-1',
          vagaId: 'spot-1',
          codigoVaga: 'A-01',
          placa: 'ABC1234',
        });
        expect(headers.location).toBe('/permanencias/stay-1');
      });

    expect(parkingOperationsService.registrarEntrada).toHaveBeenCalledWith({
      patioId: 'patio-1',
      placa: 'ABC-1234',
    });
  });

  it('UC05 delegates checkout by route parameter', async () => {
    await request(app.getHttpServer())
      .post('/permanencias/stay-1/checkout')
      .expect(201);

    expect(parkingOperationsService.concluirSaida).toHaveBeenCalledWith(
      'stay-1',
    );
  });

  it('UC06 delegates patio and spot creation', async () => {
    await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Central' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/patios/patio-1/vagas')
      .send({ codigo: 'A-01' })
      .expect(201);
    await request(app.getHttpServer()).get('/patios/patio-1/vagas').expect(200);

    expect(parkingOperationsService.criarPatio).toHaveBeenCalledWith('Central');
    expect(parkingOperationsService.criarVaga).toHaveBeenCalledWith(
      'patio-1',
      'A-01',
      undefined,
    );
    expect(parkingOperationsService.listarVagas).toHaveBeenCalledWith(
      'patio-1',
    );
  });

  it('UC07 delegates tariff fields without coercing payload types', async () => {
    await request(app.getHttpServer())
      .post('/patios/patio-1/tarifas')
      .send({ valorPorHora: 18, fracaoMinutos: 30, toleranciaMinutos: 5 })
      .expect(201);
    await request(app.getHttpServer())
      .get('/patios/patio-1/tarifa-vigente')
      .expect(200);

    expect(parkingOperationsService.definirTarifa).toHaveBeenCalledWith(
      'patio-1',
      18,
      30,
      5,
      undefined,
    );
    expect(parkingOperationsService.tarifaVigente).toHaveBeenCalledWith(
      'patio-1',
    );
  });

  it('UC08 delegates category creation and assignment', async () => {
    await request(app.getHttpServer())
      .post('/patios/patio-1/categorias-vaga')
      .send({
        codigo: 'MOTO',
        descricao: 'Motocicletas',
        tiposVeiculoCompativeis: ['MOTO'],
      })
      .expect(201);
    await request(app.getHttpServer())
      .get('/patios/patio-1/categorias-vaga')
      .expect(200);
    await request(app.getHttpServer())
      .patch('/patios/patio-1/vagas/spot-1/categoria')
      .send({ categoria: 'MOTO' })
      .expect(200);

    expect(parkingOperationsService.criarCategoria).toHaveBeenCalledWith(
      'patio-1',
      'MOTO',
      'Motocicletas',
      ['MOTO'],
    );
    expect(parkingOperationsService.listarCategorias).toHaveBeenCalledWith(
      'patio-1',
    );
    expect(parkingOperationsService.associarCategoria).toHaveBeenCalledWith(
      'patio-1',
      'spot-1',
      'MOTO',
    );
  });

  it('UC09 delegates a valid exit-impediment decision', async () => {
    await request(app.getHttpServer())
      .post('/permanencias/stay-1/resolver-impedimento')
      .send({
        decisao: 'MANTER_RETIDO',
        justificativa: 'Validacao em andamento',
        operadorId: 'operator-1',
      })
      .expect(201);

    expect(
      parkingOperationsService.resolverImpedimentoSaida,
    ).toHaveBeenCalledWith(
      'stay-1',
      'MANTER_RETIDO',
      'Validacao em andamento',
      'operator-1',
    );
  });

  it('UC10 delegates global and patio-scoped indicator queries', async () => {
    await request(app.getHttpServer()).get('/indicadores/ocupacao').expect(200);
    await request(app.getHttpServer())
      .get('/patios/patio-1/indicadores')
      .expect(200);

    expect(parkingOperationsService.indicadores).toHaveBeenNthCalledWith(1);
    expect(parkingOperationsService.indicadores).toHaveBeenNthCalledWith(
      2,
      'patio-1',
    );
  });

  it('rejects invalid DTOs before calling application services', async () => {
    await request(app.getHttpServer())
      .post('/motoristas')
      .send({ nome: ' ', email: 'invalid' })
      .expect(400);
    expect(ordersService.cadastrarMotorista).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/motoristas/driver-1/veiculos')
      .send({ placa: 123 })
      .expect(400);
    expect(ordersService.cadastrarVeiculo).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/reservas')
      .send({ patioId: 'patio-1', motoristaId: 'driver-1' })
      .expect(400);
    expect(ordersService.reservarVaga).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        patioId: 'patio-1',
        motoristaId: 'driver-1',
        veiculoId: 'vehicle-1',
        categoria: null,
      })
      .expect(400);
    expect(ordersService.reservarVaga).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: '' })
      .expect(400);
    expect(parkingOperationsService.criarPatio).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/patios/patio-1/vagas')
      .send({ codigo: ' ' })
      .expect(400);
    expect(parkingOperationsService.criarVaga).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/patios/patio-1/tarifas')
      .send({ valorPorHora: '18' })
      .expect(400);
    expect(parkingOperationsService.definirTarifa).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/patios/patio-1/categorias-vaga')
      .send({
        codigo: 'MOTO',
        descricao: 'Motocicletas',
        tiposVeiculoCompativeis: 'MOTO',
      })
      .expect(400);
    expect(parkingOperationsService.criarCategoria).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .patch('/patios/patio-1/vagas/spot-1/categoria')
      .send({ categoria: '' })
      .expect(400);
    expect(parkingOperationsService.associarCategoria).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/patios/patio-1/permanencias')
      .send({})
      .expect(400);
    expect(parkingOperationsService.registrarEntrada).not.toHaveBeenCalled();

    await request(app.getHttpServer())
      .post('/permanencias/stay-1/resolver-impedimento')
      .send({ decisao: 'UNKNOWN', justificativa: '', operadorId: '' })
      .expect(400);
    expect(
      parkingOperationsService.resolverImpedimentoSaida,
    ).not.toHaveBeenCalled();
  });
});
