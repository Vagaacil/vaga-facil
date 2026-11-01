import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity.js';
import { IOrdersRepository } from './orders.repository.interface.js';

@Injectable()
export class TypeOrmOrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<Reservation>,
  ) {}

  async findById(reservationId: string): Promise<Reservation | null> {
    return this.repository.findOne({ where: { reservationId } });
  }

  async save(reservation: Reservation): Promise<Reservation> {
    return this.repository.save(reservation);
  }
}
