import { Injectable } from '@nestjs/common';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import { Reservation } from '../entities/reservation.entity.js';
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

  async findById(reservationId: string): Promise<Reservation | null> {
    return await Promise.resolve(this.reservations.get(reservationId) ?? null);
  }

  async save(reservation: Reservation): Promise<Reservation> {
    this.reservations.set(reservation.reservationId, reservation);
    return await Promise.resolve(reservation);
  }
}
