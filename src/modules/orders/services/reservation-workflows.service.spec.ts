import { describe, expect, it } from 'vitest';
import {
  InMemoryPaymentGateway,
  type PaymentGatewayPort,
} from '../../payments/domain/payment-gateway.port.js';
import { InMemoryPaymentsRepository } from '../../payments/repositories/in-memory-payments.repository.js';
import { PaymentsService } from '../../payments/services/payments.service.js';
import { InMemoryParkingOperationsRepository } from '../../occupancy/repositories/in-memory-parking-operations.repository.js';
import { ParkingOperationsService } from '../../occupancy/services/parking-operations.service.js';
import { RegistrarEntradaHandler } from '../../occupancy/services/registrar-entrada.handler.js';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import { VagaStatus } from '../../occupancy/entities/vaga-status.enum.js';
import { InMemoryOrdersRepository } from '../repositories/in-memory-orders.repository.js';
import { OrdersService } from './orders.service.js';
import { ReservationEntryNotifier } from './reservation-entry.notifier.js';

describe('customer and reservation workflows', () => {
  function fixture() {
    let instant = new Date('2026-11-17T15:00:00.000Z');
    const clock = { agora: () => new Date(instant) };
    const parkingRepository = new InMemoryParkingOperationsRepository();
    const ordersRepository = new InMemoryOrdersRepository();
    const paymentGateway: PaymentGatewayPort = new InMemoryPaymentGateway();
    const paymentsService = new PaymentsService(
      new InMemoryPaymentsRepository(),
      paymentGateway,
    );
    const reservationNotifier = new ReservationEntryNotifier(ordersRepository);
    const parkingService = new ParkingOperationsService(
      parkingRepository,
      clock,
      new RegistrarEntradaHandler(parkingRepository, clock),
      paymentsService,
      reservationNotifier,
    );
    const ordersService = new OrdersService(
      ordersRepository,
      parkingService,
      clock,
    );
    return {
      clock,
      setNow: (value: Date) => {
        instant = value;
      },
      parkingRepository,
      ordersRepository,
      parkingService,
      ordersService,
    };
  }

  it('creates a registered driver and normalized vehicle', async () => {
    const { ordersService } = fixture();
    const motorista = await ordersService.cadastrarMotorista(
      'Ana Silva',
      'ANA@example.com',
    );
    const veiculo = await ordersService.cadastrarVeiculo(
      motorista.motoristaId,
      'abc-1234',
      'carro',
    );

    expect(veiculo.placa).toBe('ABC1234');
    expect(veiculo.tipo).toBe('CARRO');
    expect(veiculo.motoristaId).toBe(motorista.motoristaId);
  });

  it('retains a real spot, converts it on entry and completes the reservation', async () => {
    const { ordersService, parkingService, ordersRepository } = fixture();
    const patio = await parkingService.criarPatio('Pátio Central');
    const vaga = await parkingService.criarVaga(patio.patioId, 'A-01');
    const motorista = await ordersService.cadastrarMotorista(
      'Ana Silva',
      'ana@example.com',
    );
    const veiculo = await ordersService.cadastrarVeiculo(
      motorista.motoristaId,
      'ABC-1234',
    );
    const reserva = await ordersService.reservarVaga(
      patio.patioId,
      motorista.motoristaId,
      veiculo.veiculoId,
    );

    expect(reserva.vagaId).toBe(vaga.vagaId);
    expect(reserva.expiraEm.getTime() - reserva.criadaEm.getTime()).toBe(
      15 * 60_000,
    );
    expect(vaga.getStatus()).toBe(VagaStatus.RESERVADA);

    const entry = await parkingService.registrarEntrada({
      patioId: patio.patioId,
      placa: veiculo.placa,
    });

    expect(entry.vaga.vagaId).toBe(vaga.vagaId);
    expect(vaga.getStatus()).toBe(VagaStatus.OCUPADA);
    const storedReservation = await ordersRepository.buscarReserva(
      reserva.reservaId,
    );
    expect(storedReservation?.getStatus()).toBe(
      ReservationStatusEnum.COMPLETED,
    );
  });

  it('cancels a reservation and releases its retained spot', async () => {
    const { ordersService, parkingService } = fixture();
    const patio = await parkingService.criarPatio('Pátio Central');
    const vaga = await parkingService.criarVaga(patio.patioId, 'A-01');
    const motorista = await ordersService.cadastrarMotorista(
      'Bruno Silva',
      'bruno@example.com',
    );
    const veiculo = await ordersService.cadastrarVeiculo(
      motorista.motoristaId,
      'DEF-4321',
    );
    const reserva = await ordersService.reservarVaga(
      patio.patioId,
      motorista.motoristaId,
      veiculo.veiculoId,
    );

    const cancelada = await ordersService.cancelarReserva(reserva.reservaId);

    expect(cancelada.getStatus()).toBe(ReservationStatusEnum.CANCELLED);
    expect(vaga.getStatus()).toBe(VagaStatus.LIVRE);
  });

  it('expires the prior hold before reserving again after fifteen minutes', async () => {
    const { ordersService, parkingService, setNow } = fixture();
    const patio = await parkingService.criarPatio('Pátio Central');
    const vaga = await parkingService.criarVaga(patio.patioId, 'A-01');
    const motorista = await ordersService.cadastrarMotorista(
      'Caio Silva',
      'caio@example.com',
    );
    const veiculo = await ordersService.cadastrarVeiculo(
      motorista.motoristaId,
      'GHI-5678',
    );
    const primeira = await ordersService.reservarVaga(
      patio.patioId,
      motorista.motoristaId,
      veiculo.veiculoId,
    );
    setNow(new Date(primeira.expiraEm.getTime() + 1));

    const segunda = await ordersService.reservarVaga(
      patio.patioId,
      motorista.motoristaId,
      veiculo.veiculoId,
    );

    expect(segunda.reservaId).not.toBe(primeira.reservaId);
    expect(primeira.getStatus()).toBe(ReservationStatusEnum.CANCELLED);
    expect(vaga.getStatus()).toBe(VagaStatus.RESERVADA);
  });

  it('automatically releases expired holds and marks their reservations cancelled', async () => {
    const { ordersService, parkingService, setNow } = fixture();
    const patio = await parkingService.criarPatio('Pátio Central');
    const vaga = await parkingService.criarVaga(patio.patioId, 'A-01');
    const motorista = await ordersService.cadastrarMotorista(
      'Eva Silva',
      'eva@example.com',
    );
    const veiculo = await ordersService.cadastrarVeiculo(
      motorista.motoristaId,
      'MNO-3456',
    );
    const reserva = await ordersService.reservarVaga(
      patio.patioId,
      motorista.motoristaId,
      veiculo.veiculoId,
    );
    setNow(new Date(reserva.expiraEm.getTime() + 1));

    await parkingService.expirarRetencoes();

    expect(vaga.getStatus()).toBe(VagaStatus.LIVRE);
    expect(reserva.getStatus()).toBe(ReservationStatusEnum.CANCELLED);
  });

  it('rejects a vehicle incompatible with its requested spot category', async () => {
    const { ordersService, parkingService } = fixture();
    const patio = await parkingService.criarPatio('Pátio Central');
    const vaga = await parkingService.criarVaga(patio.patioId, 'M-01');
    await parkingService.criarCategoria(
      patio.patioId,
      'MOTO',
      'Vaga exclusiva para motocicletas',
      ['MOTO'],
    );
    await parkingService.associarCategoria(patio.patioId, vaga.vagaId, 'MOTO');
    const motorista = await ordersService.cadastrarMotorista(
      'Dora Silva',
      'dora@example.com',
    );
    const veiculo = await ordersService.cadastrarVeiculo(
      motorista.motoristaId,
      'JKL-9012',
      'CARRO',
    );

    await expect(
      ordersService.reservarVaga(
        patio.patioId,
        motorista.motoristaId,
        veiculo.veiculoId,
        'MOTO',
      ),
    ).rejects.toMatchObject({ status: 409 });
    expect(vaga.getStatus()).toBe(VagaStatus.LIVRE);
  });
});
