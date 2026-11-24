import { describe, expect, it } from 'vitest';
import { InMemoryParkingOperationsRepository } from '../repositories/in-memory-parking-operations.repository.js';
import { ParkingOperationsService } from './parking-operations.service.js';
import { RegistrarEntradaHandler } from './registrar-entrada.handler.js';
import {
  PatioLotadoError,
  VeiculoJaNoPatioError,
} from '../domain/parking-operations.errors.js';
import { VagaStatus } from '../entities/vaga-status.enum.js';
import { InMemoryPaymentsRepository } from '../../payments/repositories/in-memory-payments.repository.js';
import {
  InMemoryPaymentGateway,
  type PaymentGatewayPort,
} from '../../payments/domain/payment-gateway.port.js';
import { PaymentsService } from '../../payments/services/payments.service.js';
import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum.js';
import { vi } from 'vitest';
import { DecisaoImpedimentoSaida } from '../entities/impedimento-saida.entity.js';

describe('ParkingOperationsService and RegistrarEntradaHandler', () => {
  const agora = new Date('2026-11-17T15:00:00.000Z');

  function fixture(gateway: PaymentGatewayPort = new InMemoryPaymentGateway()) {
    const repository = new InMemoryParkingOperationsRepository();
    const clock = { agora: () => new Date(agora) };
    const handler = new RegistrarEntradaHandler(repository, clock);
    const paymentsService = new PaymentsService(
      new InMemoryPaymentsRepository(),
      gateway,
    );
    const service = new ParkingOperationsService(
      repository,
      clock,
      handler,
      paymentsService,
    );
    return { repository, service, handler, paymentsService };
  }

  it('creates a patio and its initial free spots', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');

    expect(vaga.patioId).toBe(patio.patioId);
    expect(vaga.categoria).toBe('PADRAO');
    expect(vaga.getStatus()).toBe('Livre');
    await expect(service.listarVagas(patio.patioId)).resolves.toEqual([vaga]);
  });

  it('lists patios with pagination and stable ordering', async () => {
    const { service } = fixture();
    await service.criarPatio('Zulu');
    await service.criarPatio('Alpha');
    await service.criarPatio('Beta');

    await expect(service.listarPatios(1, 2)).resolves.toMatchObject({
      page: 1,
      limit: 2,
      total: 3,
    });
    const result = await service.listarPatios(1, 2);
    expect(result.items.map((patio) => patio.nome)).toEqual(['Alpha', 'Beta']);
  });

  it('returns an empty page for a repo with no patios', async () => {
    const { service } = fixture();
    await expect(service.listarPatios()).resolves.toEqual({
      items: [],
      page: 1,
      limit: 20,
      total: 0,
    });
  });

  it('rejects invalid pagination parameters', async () => {
    const { service } = fixture();
    await expect(service.listarPatios(0, 20)).rejects.toMatchObject({
      status: 400,
    });
    await expect(service.listarPatios(1, 101)).rejects.toMatchObject({
      status: 400,
    });
  });

  it('rejects duplicate spot codes and category codes', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    await service.criarVaga(patio.patioId, 'A-01');

    await expect(
      service.criarVaga(patio.patioId, 'A-01'),
    ).rejects.toMatchObject({
      status: 409,
      response: { code: 'VAGA_DUPLICADA' },
    });

    await service.criarCategoria(patio.patioId, 'MOTO', 'Motocicletas', [
      'MOTO',
    ]);
    await expect(
      service.criarCategoria(patio.patioId, 'MOTO', 'Categoria duplicada', [
        'MOTO',
      ]),
    ).rejects.toMatchObject({
      status: 409,
      response: { code: 'CATEGORIA_DUPLICADA' },
    });
  });

  it('registers an entry with normalized plate and occupies exactly one spot', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');

    const result = await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'abc-1234',
    });

    expect(result.registro.placa).toBe('ABC1234');
    expect(result.registro.horarioEntrada).toEqual(agora);
    expect(result.registro.vagaId).toBe(vaga.vagaId);
    expect(vaga.getStatus()).toBe('Ocupada');
  });

  it('rejects a second open stay for the same plate and a full patio', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    await service.criarVaga(patio.patioId, 'A-01');
    await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'ABC-1234',
    });

    await expect(
      service.registrarEntrada({ patioId: patio.patioId, placa: 'ABC1234' }),
    ).rejects.toBeInstanceOf(VeiculoJaNoPatioError);
    await expect(
      service.registrarEntrada({ patioId: patio.patioId, placa: 'XYZ-9876' }),
    ).rejects.toBeInstanceOf(PatioLotadoError);
  });

  it('selects only a tariff effective at the injected current time', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const tariff = await service.definirTarifa(patio.patioId, 20, 15, 5);

    await expect(service.tarifaVigente(patio.patioId)).resolves.toBe(tariff);
    await service.definirTarifa(
      patio.patioId,
      30,
      30,
      0,
      '2026-11-18T00:00:00.000Z',
    );
    await expect(service.tarifaVigente(patio.patioId)).resolves.toBe(tariff);
  });

  it('rejects tariff lookup when the patio has no effective tariff', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');

    await expect(service.tarifaVigente(patio.patioId)).rejects.toMatchObject({
      status: 409,
    });
  });

  it('allows only the reservation holder to occupy a retained spot', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');
    vaga.reter('reserva-1', 'ABC1234', new Date(agora.getTime() + 60_000));

    expect(vaga.getStatus()).toBe(VagaStatus.RESERVADA);
    expect(() => vaga.ocupar('reserva-1', 'XYZ1234')).toThrow(
      'RESERVA_NAO_AUTORIZADA',
    );
    vaga.ocupar('reserva-1', 'ABC1234');
    expect(vaga.getStatus()).toBe(VagaStatus.OCUPADA);
    vaga.liberar();
    expect(vaga.getStatus()).toBe(VagaStatus.LIVRE);
  });

  it('rejects an invalid plate before allocating a spot', async () => {
    const { service, repository } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');

    await expect(
      service.registrarEntrada({ patioId: patio.patioId, placa: 'INVALID' }),
    ).rejects.toThrow('PLACA_INVALIDA');
    await expect(repository.listVagas(patio.patioId)).resolves.toEqual([vaga]);
    expect(vaga.getStatus()).toBe('Livre');
  });

  it('charges using the effective tariff and atomically closes the stay', async () => {
    const { service, repository } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');
    await service.definirTarifa(patio.patioId, 18, 60, 0);
    const { registro } = await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'ABC-1234',
    });

    const response = await service.concluirSaida(
      registro.registroId,
      new Date('2026-11-17T16:01:00.000Z'),
    );

    expect(response.valorCobrado).toBe(36);
    expect(response.statusPagamento).toBe(PaymentStatusEnum.APPROVED);
    expect(vaga.getStatus()).toBe(VagaStatus.LIVRE);
    expect(registro.getStatus()).toBe('closed');
    await expect(
      repository.findPermanenciaById(registro.registroId),
    ).resolves.toBe(registro);
    await expect(service.indicadores(patio.patioId)).resolves.toMatchObject({
      totalVagas: 1,
      vagasLivres: 1,
      vagasOcupadas: 0,
      taxaOcupacao: 0,
      tempoMedioPermanenciaMinutos: 61,
    });
  });

  it('keeps the stay and spot open when payment is rejected', async () => {
    const gateway = {
      processar: vi.fn().mockResolvedValue(PaymentStatusEnum.REJECTED),
    };
    const { service } = fixture(gateway);
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');
    await service.definirTarifa(patio.patioId, 18);
    const { registro } = await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'ABC-1234',
    });

    await expect(
      service.concluirSaida(
        registro.registroId,
        new Date(agora.getTime() + 60_000),
      ),
    ).rejects.toMatchObject({ status: 409 });
    expect(registro.getStatus()).toBe('open');
    expect(vaga.getStatus()).toBe(VagaStatus.OCUPADA);
  });

  it('does not contact the gateway when no tariff exists', async () => {
    const gateway = { processar: vi.fn() };
    const { service } = fixture(gateway);
    const patio = await service.criarPatio('Pátio Central');
    await service.criarVaga(patio.patioId, 'A-01');
    const { registro } = await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'ABC-1234',
    });

    await expect(
      service.concluirSaida(
        registro.registroId,
        new Date(agora.getTime() + 60_000),
      ),
    ).rejects.toMatchObject({ status: 409 });
    expect(gateway.processar.mock.calls).toHaveLength(0);
  });

  it('returns service unavailable and keeps occupancy when the gateway fails', async () => {
    const gateway = {
      processar: vi.fn().mockRejectedValue(new Error('offline')),
    };
    const { service } = fixture(gateway);
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');
    await service.definirTarifa(patio.patioId, 18);
    const { registro } = await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'ABC-1234',
    });

    await expect(
      service.concluirSaida(
        registro.registroId,
        new Date(agora.getTime() + 60_000),
      ),
    ).rejects.toMatchObject({ status: 503 });
    expect(registro.getStatus()).toBe('open');
    expect(vaga.getStatus()).toBe(VagaStatus.OCUPADA);
  });

  it('audits both retain and manual-release decisions', async () => {
    const { service } = fixture();
    const patio = await service.criarPatio('Pátio Central');
    const vaga = await service.criarVaga(patio.patioId, 'A-01');
    const { registro } = await service.registrarEntrada({
      patioId: patio.patioId,
      placa: 'ABC-1234',
    });

    const retido = await service.resolverImpedimentoSaida(
      registro.registroId,
      DecisaoImpedimentoSaida.MANTER_RETIDO,
      'Aguardando verificação',
      'operador-1',
    );
    expect(retido.statusPermanencia).toBe('open');
    expect(vaga.getStatus()).toBe(VagaStatus.OCUPADA);

    const liberado = await service.resolverImpedimentoSaida(
      registro.registroId,
      DecisaoImpedimentoSaida.LIBERAR_MANUALMENTE,
      'Autorização registrada',
      'operador-1',
    );
    expect(liberado.statusPermanencia).toBe('closed');
    expect(liberado.statusVaga).toBe(VagaStatus.LIVRE);
    expect(registro.getStatus()).toBe('closed');
  });
});
