import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity.js';
import { ReservationOrmEntity } from '../entities/reservation.orm-entity.js';
import { ReservationMapper } from '../mappers/reservation.mapper.js';
import { IOrdersRepository } from './orders.repository.interface.js';

@Injectable()
export class TypeOrmOrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(ReservationOrmEntity)
    private readonly repository: Repository<ReservationOrmEntity>,
  ) {}

  async findById(reservationId: string): Promise<Reservation | null> {
    const reservationOrm = await this.repository.findOne({
      where: { reservationId },
    });

    return reservationOrm ? ReservationMapper.toDomain(reservationOrm) : null;
  }

  async save(reservation: Reservation): Promise<Reservation> {
    const reservationOrm = ReservationMapper.toOrm(reservation);
    const savedReservation = await this.repository.save(reservationOrm);
    return ReservationMapper.toDomain(savedReservation);
  }
}
