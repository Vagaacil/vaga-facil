import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity.js';
import { Motorista } from '../entities/motorista.entity.js';
import { Veiculo } from '../entities/veiculo.entity.js';
import { Reserva } from '../entities/reserva.entity.js';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import { IOrdersRepository } from './orders.repository.interface.js';

@Injectable()
export class TypeOrmOrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<Reservation>,
    @InjectRepository(Motorista)
    private readonly motoristas: Repository<Motorista>,
    @InjectRepository(Veiculo)
    private readonly veiculos: Repository<Veiculo>,
    @InjectRepository(Reserva)
    private readonly reservas: Repository<Reserva>,
  ) {}

  async findById(reservationId: string): Promise<Reservation | null> {
    return this.repository.findOne({ where: { reservationId } });
  }

  async save(reservation: Reservation): Promise<Reservation> {
    return this.repository.save(reservation);
  }

  criarMotorista(motorista: Motorista): Promise<Motorista> {
    return this.motoristas.save(motorista);
  }

  buscarMotorista(motoristaId: string): Promise<Motorista | null> {
    return this.motoristas.findOne({ where: { motoristaId } });
  }

  criarVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculos.save(veiculo);
  }

  buscarVeiculo(veiculoId: string): Promise<Veiculo | null> {
    return this.veiculos.findOne({ where: { veiculoId } });
  }

  criarReserva(reserva: Reserva): Promise<Reserva> {
    return this.reservas.save(reserva);
  }

  buscarReserva(reservaId: string): Promise<Reserva | null> {
    return this.reservas.findOne({ where: { reservaId } });
  }

  salvarReserva(reserva: Reserva): Promise<Reserva> {
    return this.reservas.save(reserva);
  }

  buscarReservaAtivaDoVeiculo(veiculoId: string): Promise<Reserva | null> {
    return this.reservas
      .createQueryBuilder('reserva')
      .where('reserva.veiculoId = :veiculoId', { veiculoId })
      .andWhere('reserva.status = :status', {
        status: ReservationStatusEnum.CONFIRMED,
      })
      .getOne();
  }

  listarReservasExpiradas(agora: Date): Promise<Reserva[]> {
    return this.reservas
      .createQueryBuilder('reserva')
      .where('reserva.status = :status', {
        status: ReservationStatusEnum.CONFIRMED,
      })
      .andWhere('reserva.expiraEm <= :agora', { agora })
      .getMany();
  }
}
