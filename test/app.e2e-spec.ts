import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Server } from 'node:http';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<Server>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/patios (GET) lists all patios and validates pagination', async () => {
    await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Zulu' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Alpha' })
      .expect(201);

    await request(app.getHttpServer())
      .get('/patios?page=1&limit=20')
      .expect(200)
      .expect(({ body }) => {
        expect(body as { items: unknown[]; total: number }).toMatchObject({
          total: 2,
        });
        expect((body as { items: Array<{ nome: string }> }).items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ nome: 'Alpha' }),
            expect.objectContaining({ nome: 'Zulu' }),
          ]),
        );
      });

    await request(app.getHttpServer()).get('/patios?page=0').expect(400);
  });

  it('/orders/reservation-1/confirm (POST)', () => {
    return request(app.getHttpServer())
      .post('/orders/reservation-1/confirm')
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          reservationId: 'reservation-1',
          reservationStatus: 'confirmed',
        });
      });
  });

  it('/parking-stays/stay-1/checkout (POST)', () => {
    return request(app.getHttpServer())
      .post('/parking-stays/stay-1/checkout')
      .expect(201)
      .expect(({ body }) => {
        const responseBody = body as {
          parkingStayId: string;
          vehiclePlate: string;
          parkingSpotId: string;
          status: string;
          totalAmount: number;
        };

        expect(responseBody).toMatchObject({
          parkingStayId: 'stay-1',
          vehiclePlate: 'ABC-1234',
          parkingSpotId: 'spot-1',
          status: 'closed',
        });
        expect(responseBody.totalAmount).toBeGreaterThan(0);
      });
  });

  it('creates a patio, defines its tariff and registers a vehicle entry', async () => {
    const patioResponse = await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Pátio E2E' })
      .expect(201);
    const patioBody = patioResponse.body as { patioId: string; nome: string };
    const patioId = patioBody.patioId;
    expect(patioBody.nome).toBe('Pátio E2E');

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/vagas`)
      .send({ codigo: 'A-01' })
      .expect(201)
      .expect(({ body }) => {
        const responseBody = body as {
          patioId: string;
          codigo: string;
          categoria: string;
          status: string;
        };
        expect(responseBody).toMatchObject({
          patioId,
          codigo: 'A-01',
          categoria: 'PADRAO',
        });
        expect(responseBody.status).toBe('Livre');
      });

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/tarifas`)
      .send({ valorPorHora: 18 })
      .expect(201);
    await request(app.getHttpServer())
      .get(`/patios/${patioId}/tarifa-vigente`)
      .expect(200)
      .expect(({ body }) => {
        expect(body as { patioId: string; valorPorHora: number }).toMatchObject(
          { patioId, valorPorHora: 18 },
        );
      });

    const entryResponse = await request(app.getHttpServer())
      .post(`/patios/${patioId}/permanencias`)
      .send({ placa: 'ABC-1234' })
      .expect(201)
      .expect(({ body, headers }) => {
        const responseBody = body as {
          registroId: string;
          patioId: string;
          codigoVaga: string;
          placa: string;
          horarioEntrada: string;
        };
        expect(headers.location).toBe(
          `/permanencias/${responseBody.registroId}`,
        );
        expect(responseBody).toMatchObject({
          patioId,
          codigoVaga: 'A-01',
          placa: 'ABC1234',
        });
        expect(responseBody.registroId).toBeTruthy();
        expect(responseBody.horarioEntrada).toBeTruthy();
      });
    const registroId = (entryResponse.body as { registroId: string })
      .registroId;

    await request(app.getHttpServer())
      .get(`/patios/${patioId}/vagas`)
      .expect(200)
      .expect(({ body }) => {
        const responseBody = body as Array<{ status: string }>;
        expect(responseBody[0]?.status).toBe('Ocupada');
      });

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/permanencias`)
      .send({ placa: 'ABC-1234' })
      .expect(409)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'VEICULO_JA_NO_PATIO',
        });
      });

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/permanencias`)
      .send({ placa: 'XYZ-9876' })
      .expect(409)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'PATIO_LOTADO',
        });
      });

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/permanencias`)
      .send({ placa: 'INVÁLIDA' })
      .expect(400)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'PLACA_INVALIDA',
        });
      });

    await request(app.getHttpServer())
      .get('/patios/inexistente/vagas')
      .expect(404)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'PATIO_NAO_ENCONTRADO',
        });
      });

    await request(app.getHttpServer())
      .post(`/permanencias/${registroId}/checkout`)
      .expect(201)
      .expect(({ body }) => {
        expect(
          body as { registroId: string; statusPagamento: string },
        ).toMatchObject({
          registroId,
          statusPagamento: 'APPROVED',
        });
      });

    await request(app.getHttpServer())
      .get(`/patios/${patioId}/vagas`)
      .expect(200)
      .expect(({ body }) => {
        const responseBody = body as Array<{ status: string }>;
        expect(responseBody[0]?.status).toBe('Livre');
      });
  });

  it('records an exit impediment decision and releases the spot when authorized', async () => {
    const patio = await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Pátio Portaria' })
      .expect(201);
    const patioId = (patio.body as { patioId: string }).patioId;
    await request(app.getHttpServer())
      .post(`/patios/${patioId}/vagas`)
      .send({ codigo: 'P-01' })
      .expect(201);
    const entry = await request(app.getHttpServer())
      .post(`/patios/${patioId}/permanencias`)
      .send({ placa: 'DEF-4321' })
      .expect(201);
    const registroId = (entry.body as { registroId: string }).registroId;

    await request(app.getHttpServer())
      .post(`/permanencias/${registroId}/resolver-impedimento`)
      .send({
        decisao: 'MANTER_RETIDO',
        justificativa: 'Aguardando validação do operador',
        operadorId: 'operador-1',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body as { statusPermanencia: string }).toMatchObject({
          statusPermanencia: 'open',
        });
      });

    await request(app.getHttpServer())
      .post(`/permanencias/${registroId}/resolver-impedimento`)
      .send({
        decisao: 'LIBERAR_MANUALMENTE',
        justificativa: 'Liberação autorizada e auditada',
        operadorId: 'operador-1',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(
          body as {
            decisao: string;
            statusPermanencia: string;
            statusVaga: string;
          },
        ).toMatchObject({
          decisao: 'LIBERAR_MANUALMENTE',
          statusPermanencia: 'closed',
          statusVaga: 'Livre',
        });
      });
  });

  it('registers a driver and vehicle, reserves and cancels a categorized spot', async () => {
    const patio = await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Pátio Reservas' })
      .expect(201);
    const patioId = (patio.body as { patioId: string }).patioId;
    await request(app.getHttpServer())
      .post(`/patios/${patioId}/vagas`)
      .send({ codigo: 'A-01' })
      .expect(201);
    const motoSpot = await request(app.getHttpServer())
      .post(`/patios/${patioId}/vagas`)
      .send({ codigo: 'M-01', categoria: 'MOTO' })
      .expect(201);
    const motoSpotId = (motoSpot.body as { vagaId: string }).vagaId;
    await request(app.getHttpServer())
      .post(`/patios/${patioId}/categorias-vaga`)
      .send({
        codigo: 'MOTO',
        descricao: 'Vagas para motocicletas',
        tiposVeiculoCompativeis: ['MOTO'],
      })
      .expect(201);
    await request(app.getHttpServer())
      .get(`/patios/${patioId}/categorias-vaga`)
      .expect(200)
      .expect(({ body }) => {
        expect(body as Array<{ codigo: string }>).toContainEqual(
          expect.objectContaining({ codigo: 'MOTO' }),
        );
      });
    await request(app.getHttpServer())
      .patch(`/patios/${patioId}/vagas/${motoSpotId}/categoria`)
      .send({ categoria: 'MOTO' })
      .expect(200);

    const motoristaResponse = await request(app.getHttpServer())
      .post('/motoristas')
      .send({ nome: 'Equipe E2E', email: 'e2e@example.com' })
      .expect(201);
    const motoristaId = (motoristaResponse.body as { motoristaId: string })
      .motoristaId;
    const veiculoResponse = await request(app.getHttpServer())
      .post(`/motoristas/${motoristaId}/veiculos`)
      .send({ placa: 'KLM-1234', tipo: 'CARRO' })
      .expect(201);
    const veiculoId = (veiculoResponse.body as { veiculoId: string }).veiculoId;

    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        patioId,
        motoristaId,
        veiculoId,
        categoria: 'MOTO',
      })
      .expect(409);

    const reservaResponse = await request(app.getHttpServer())
      .post('/reservas')
      .send({ patioId, motoristaId, veiculoId })
      .expect(201);
    const reservaId = (reservaResponse.body as { reservaId: string }).reservaId;

    await request(app.getHttpServer())
      .get(`/patios/${patioId}/indicadores`)
      .expect(200)
      .expect(({ body }) => {
        expect(
          body as {
            totalVagas: number;
            vagasLivres: number;
            vagasReservadas: number;
          },
        ).toMatchObject({
          totalVagas: 2,
          vagasLivres: 1,
          vagasReservadas: 1,
        });
      });

    await request(app.getHttpServer())
      .post(`/reservas/${reservaId}/cancelar`)
      .expect(201)
      .expect(({ body }) => {
        expect(body as { status: string }).toMatchObject({
          status: 'cancelled',
        });
      });

    await request(app.getHttpServer())
      .get('/indicadores/ocupacao')
      .expect(200)
      .expect(({ body }) => {
        expect(
          body as { totalVagas: number; vagasLivres: number },
        ).toMatchObject({
          totalVagas: 2,
          vagasLivres: 2,
        });
      });
  });

  it('applies UC01, UC06 and UC08 duplicate conflict decisions at the HTTP boundary', async () => {
    await request(app.getHttpServer())
      .post('/motoristas')
      .send({ nome: 'Ana Duplicada', email: 'duplicada@example.com' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/motoristas')
      .send({ nome: 'Outra Ana', email: 'DUPLICADA@example.com' })
      .expect(409)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'MOTORISTA_DUPLICADO',
        });
      });

    const motorista = await request(app.getHttpServer())
      .post('/motoristas')
      .send({ nome: 'Motorista Veículo', email: 'veiculo@example.com' })
      .expect(201);
    const motoristaId = (motorista.body as { motoristaId: string }).motoristaId;

    await request(app.getHttpServer())
      .post(`/motoristas/${motoristaId}/veiculos`)
      .send({ placa: 'ABC-1234', tipo: 'CARRO' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/motoristas/${motoristaId}/veiculos`)
      .send({ placa: 'ABC1234', tipo: 'MOTO' })
      .expect(409)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'VEICULO_DUPLICADO',
        });
      });

    const patio = await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Pátio Regras' })
      .expect(201);
    const patioId = (patio.body as { patioId: string }).patioId;

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/vagas`)
      .send({ codigo: 'DUP-01', categoria: 'PADRAO' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/vagas`)
      .send({ codigo: 'DUP-01', categoria: 'PADRAO' })
      .expect(409)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'VAGA_DUPLICADA',
        });
      });

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/categorias-vaga`)
      .send({
        codigo: 'MOTO',
        descricao: 'Motocicletas',
        tiposVeiculoCompativeis: ['MOTO'],
      })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/patios/${patioId}/categorias-vaga`)
      .send({
        codigo: 'MOTO',
        descricao: 'Categoria duplicada',
        tiposVeiculoCompativeis: ['MOTO'],
      })
      .expect(409)
      .expect(({ body }) => {
        expect(body as { code: string }).toMatchObject({
          code: 'CATEGORIA_DUPLICADA',
        });
      });
  });

  it('rejects malformed request bodies at the HTTP boundary across use cases', async () => {
    await request(app.getHttpServer())
      .post('/motoristas')
      .send({ nome: ' ', email: 'not-an-email' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/motoristas/not-a-driver/veiculos')
      .send({ placa: 123 })
      .expect(400);

    await request(app.getHttpServer())
      .post('/reservas')
      .send({ patioId: 'p', motoristaId: 'm' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: '' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/patios/not-a-patio/vagas')
      .send({ codigo: ' ' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/patios/not-a-patio/tarifas')
      .send({ valorPorHora: '18' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/patios/not-a-patio/categorias-vaga')
      .send({
        codigo: 'MOTO',
        descricao: 'Motocicletas',
        tiposVeiculoCompativeis: 'MOTO',
      })
      .expect(400);

    await request(app.getHttpServer())
      .patch('/patios/not-a-patio/vagas/not-a-spot/categoria')
      .send({ categoria: '' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/patios/not-a-patio/permanencias')
      .send({})
      .expect(400);

    await request(app.getHttpServer())
      .post('/permanencias/not-a-stay/resolver-impedimento')
      .send({
        decisao: 'UNKNOWN',
        justificativa: '',
        operadorId: '',
      })
      .expect(400);
  });

  it('searches patios and rejects malformed UUID identifiers', async () => {
    const created = await request(app.getHttpServer())
      .post('/patios')
      .send({ nome: 'Pátio Busca' })
      .expect(201);
    const patioId = (created.body as { patioId: string }).patioId;

    await request(app.getHttpServer())
      .get(`/patios/${patioId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body as { patioId: string; nome: string }).toMatchObject({
          patioId,
          nome: 'Pátio Busca',
        });
      });

    await request(app.getHttpServer()).get('/patios/not-a-uuid').expect(400);

    await request(app.getHttpServer())
      .get('/patios/00000000-0000-4000-8000-000000000000')
      .expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
