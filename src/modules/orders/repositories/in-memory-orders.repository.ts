import { Injectable } from '@nestjs/common';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import { Reservation } from '../entities/reservation.entity.js';
import { Motorista } from '../entities/motorista.entity.js';
import { Veiculo } from '../entities/veiculo.entity.js';
import { Reserva } from '../entities/reserva.entity.js';
import { IOrdersRepository } from './orders.repository.interface.js';

@Injectable()
export class InMemoryOrdersRepository implements IOrdersRepository {
  private readonly reservations = new Map<string, Reservation>([
    [
      'reservation-1',
      new Reservation(
        'reservation-1',
        'spot-1',
        'user-1',
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
      ),
    ],
    [
      'reservation-2',
      new Reservation(
        'reservation-2',
        'spot-2',
        'user-2',
        new Date(),
        new Date(Date.now() + 2 * 60 * 60 * 1000),
        ReservationStatusEnum.CONFIRMED,
      ),
    ],
  ]);
  private readonly motoristas = new Map<string, Motorista>();
  private readonly veiculos = new Map<string, Veiculo>();
  private readonly reservas = new Map<string, Reserva>();

  async findById(reservationId: string): Promise<Reservation | null> {
    return await Promise.resolve(this.reservations.get(reservationId) ?? null);
  }

  async save(reservation: Reservation): Promise<Reservation> {
    this.reservations.set(reservation.reservationId, reservation);
    return await Promise.resolve(reservation);
  }

  criarMotorista(motorista: Motorista): Promise<Motorista> {
    if (
      [...this.motoristas.values()].some(
        (existing) => existing.email === motorista.email,
      )
    ) {
      throw new Error('MOTORISTA_DUPLICADO');
    }
    this.motoristas.set(motorista.motoristaId, motorista);
    return Promise.resolve(motorista);
  }

  buscarMotorista(motoristaId: string): Promise<Motorista | null> {
    return Promise.resolve(this.motoristas.get(motoristaId) ?? null);
  }

  async criarVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    if (!(await this.buscarMotorista(veiculo.motoristaId))) {
      throw new Error('MOTORISTA_NAO_ENCONTRADO');
    }
    if (
      [...this.veiculos.values()].some((item) => item.placa === veiculo.placa)
    ) {
      throw new Error('VEICULO_DUPLICADO');
    }
    this.veiculos.set(veiculo.veiculoId, veiculo);
    return veiculo;
  }

  buscarVeiculo(veiculoId: string): Promise<Veiculo | null> {
    return Promise.resolve(this.veiculos.get(veiculoId) ?? null);
  }

  async criarReserva(reserva: Reserva): Promise<Reserva> {
    if (await this.buscarReservaAtivaDoVeiculo(reserva.veiculoId)) {
      throw new Error('RESERVA_ATIVA_EXISTENTE');
    }
    this.reservas.set(reserva.reservaId, reserva);
    return reserva;
  }

  buscarReserva(reservaId: string): Promise<Reserva | null> {
    return Promise.resolve(this.reservas.get(reservaId) ?? null);
  }

  salvarReserva(reserva: Reserva): Promise<Reserva> {
    this.reservas.set(reserva.reservaId, reserva);
    return Promise.resolve(reserva);
  }

  buscarReservaAtivaDoVeiculo(veiculoId: string): Promise<Reserva | null> {
    return Promise.resolve(
      [...this.reservas.values()].find(
        (reserva) =>
          reserva.veiculoId === veiculoId &&
          reserva.getStatus() === ReservationStatusEnum.CONFIRMED,
      ) ?? null,
    );
  }

  listarReservasExpiradas(agora: Date): Promise<Reserva[]> {
    return Promise.resolve(
      [...this.reservas.values()].filter(
        (reserva) =>
          reserva.getStatus() === ReservationStatusEnum.CONFIRMED &&
          reserva.expiraEm <= agora,
      ),
    );
  }
}
