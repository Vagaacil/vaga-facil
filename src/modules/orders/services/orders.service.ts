import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ConfirmOrderResponseDto } from '../dto/confirm-order-response.dto.js';
import { CancelReservationResponseDto } from '../dto/cancel-reservation-response.dto.js';
import { ReservationNotFoundException } from '../../../common/exceptions/reservation-not-found.exception.js';
import {
  ORDERS_REPOSITORY,
  type IOrdersRepository,
} from '../repositories/orders.repository.interface.js';
import { Motorista } from '../entities/motorista.entity.js';
import { Veiculo } from '../entities/veiculo.entity.js';
import { Reserva } from '../entities/reserva.entity.js';
import { ParkingOperationsService } from '../../occupancy/services/parking-operations.service.js';
import {
  CLOCK_PORT,
  type ClockPort,
} from '../../occupancy/domain/clock.port.js';
import { Placa } from '../../occupancy/domain/placa.js';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepository: IOrdersRepository,
    private readonly parkingOperations: ParkingOperationsService,
    @Inject(CLOCK_PORT) private readonly clock: ClockPort,
  ) {}

  async confirmOrder(reservationId: string): Promise<ConfirmOrderResponseDto> {
    const reservation = await this.ordersRepository.findById(reservationId);

    if (!reservation) {
      throw new ReservationNotFoundException(reservationId);
    }

    reservation.confirmReservation();
    await this.ordersRepository.save(reservation);

    return new ConfirmOrderResponseDto(
      reservation.reservationId,
      reservation.getStatus(),
    );
  }

  async cancelReservation(
    reservationId: string,
  ): Promise<CancelReservationResponseDto> {
    const reservation = await this.ordersRepository.findById(reservationId);

    if (!reservation) {
      throw new ReservationNotFoundException(reservationId);
    }

    reservation.cancelReservation();
    await this.ordersRepository.save(reservation);

    return new CancelReservationResponseDto(
      reservation.reservationId,
      reservation.getStatus(),
    );
  }

  async cadastrarMotorista(nome: unknown, email: unknown): Promise<Motorista> {
    if (typeof nome !== 'string' || !nome.trim()) {
      throw new BadRequestException('O nome do Motorista é obrigatório.');
    }
    if (
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      throw new BadRequestException('O e-mail do Motorista é inválido.');
    }
    return this.ordersRepository.criarMotorista(
      new Motorista(randomUUID(), nome.trim(), email.trim().toLowerCase()),
    );
  }

  async cadastrarVeiculo(
    motoristaId: string,
    placaInput: unknown,
    tipoInput: unknown = 'CARRO',
  ): Promise<Veiculo> {
    const motorista = await this.ordersRepository.buscarMotorista(motoristaId);
    if (!motorista) {
      throw new NotFoundException({
        code: 'MOTORISTA_NAO_ENCONTRADO',
        message: 'Motorista não encontrado.',
      });
    }
    if (typeof placaInput !== 'string') {
      throw new BadRequestException({
        code: 'PLACA_INVALIDA',
        message: 'A placa do Veículo é obrigatória.',
      });
    }
    if (typeof tipoInput !== 'string' || !tipoInput.trim()) {
      throw new BadRequestException('O tipo de Veículo é inválido.');
    }
    let placa: Placa;
    try {
      placa = Placa.criar(placaInput);
    } catch (error) {
      if (error instanceof Error && error.message === 'PLACA_INVALIDA') {
        throw new BadRequestException({
          code: 'PLACA_INVALIDA',
          message: error.message,
        });
      }
      throw error;
    }
    return this.ordersRepository.criarVeiculo(
      new Veiculo(
        randomUUID(),
        motoristaId,
        placa.valor,
        tipoInput.trim().toUpperCase(),
      ),
    );
  }

  async reservarVaga(
    patioId: string,
    motoristaId: unknown,
    veiculoId: unknown,
    categoriaInput: unknown = 'PADRAO',
  ): Promise<Reserva> {
    if (!patioId.trim()) {
      throw new BadRequestException('patioId é obrigatório.');
    }
    if (typeof motoristaId !== 'string' || typeof veiculoId !== 'string') {
      throw new BadRequestException(
        'motoristaId e veiculoId são obrigatórios.',
      );
    }
    if (typeof categoriaInput !== 'string' || !categoriaInput.trim()) {
      throw new BadRequestException('A categoria da Vaga é inválida.');
    }
    const motorista = await this.ordersRepository.buscarMotorista(motoristaId);
    if (!motorista) {
      throw new NotFoundException({
        code: 'MOTORISTA_NAO_ENCONTRADO',
        message: 'Motorista não encontrado.',
      });
    }
    const veiculo = await this.ordersRepository.buscarVeiculo(veiculoId);
    if (!veiculo || veiculo.motoristaId !== motoristaId) {
      throw new NotFoundException({
        code: 'VEICULO_NAO_ENCONTRADO',
        message: 'Veículo cadastrado do Motorista não encontrado.',
      });
    }
    const agora = this.clock.agora();
    const expiradas =
      await this.ordersRepository.listarReservasExpiradas(agora);
    for (const expiradasReserva of expiradas) {
      await this.expirarReserva(expiradasReserva, agora);
    }
    const reservaExistente =
      await this.ordersRepository.buscarReservaAtivaDoVeiculo(veiculoId);
    if (reservaExistente) {
      if (reservaExistente.expiraEm > agora) {
        throw new ConflictException({
          code: 'RESERVA_ATIVA_EXISTENTE',
          message: 'O Veículo já possui uma Reserva ativa.',
        });
      }
      await this.expirarReserva(reservaExistente, agora);
    }

    const reservaId = randomUUID();
    const categoria = categoriaInput.trim().toUpperCase();
    await this.parkingOperations.verificarCompatibilidadeVeiculo(
      patioId,
      categoria,
      veiculo.tipo,
    );
    const expiraEm = new Date(agora.getTime() + 15 * 60_000);
    const vaga = await this.parkingOperations.reterVaga(
      patioId,
      categoria,
      reservaId,
      veiculo.placa,
      expiraEm,
    );
    const reserva = new Reserva(
      reservaId,
      patioId,
      vaga.vagaId,
      motoristaId,
      veiculoId,
      veiculo.placa,
      categoria,
      expiraEm,
      ReservationStatusEnum.CONFIRMED,
      agora,
    );
    try {
      return await this.ordersRepository.criarReserva(reserva);
    } catch (error) {
      try {
        await this.parkingOperations.liberarRetencao(vaga.vagaId, reservaId);
      } catch (rollbackError) {
        throw new AggregateError(
          [error, rollbackError],
          'Falha ao persistir a Reserva e reverter a retenção da Vaga.',
        );
      }
      throw error;
    }
  }

  async cancelarReserva(reservaId: string): Promise<Reserva> {
    const reserva = await this.ordersRepository.buscarReserva(reservaId);
    if (!reserva) {
      throw new NotFoundException({
        code: 'RESERVA_NAO_ENCONTRADA',
        message: 'Reserva não encontrada.',
      });
    }
    const agora = this.clock.agora();
    if (reserva.getStatus() !== ReservationStatusEnum.CONFIRMED) {
      throw new ConflictException({
        code: 'RESERVA_NAO_ATIVA',
        message: 'Somente Reservas ativas podem ser canceladas.',
      });
    }
    if (reserva.expiraEm <= agora) {
      return this.expirarReserva(reserva, agora);
    }
    await this.parkingOperations.liberarRetencao(
      reserva.vagaId,
      reserva.reservaId,
    );
    reserva.cancelar();
    return this.ordersRepository.salvarReserva(reserva);
  }

  private async expirarReserva(
    reserva: Reserva,
    agora: Date,
  ): Promise<Reserva> {
    if (
      reserva.getStatus() === ReservationStatusEnum.CONFIRMED &&
      reserva.expiraEm <= agora
    ) {
      await this.parkingOperations.liberarRetencao(
        reserva.vagaId,
        reserva.reservaId,
      );
      if (reserva.expirar(agora)) {
        return this.ordersRepository.salvarReserva(reserva);
      }
    }
    return reserva;
  }
}
