import { Reservation } from '../entities/reservation.entity.js';

export const ORDERS_REPOSITORY = 'ORDERS_REPOSITORY';

export interface IOrdersRepository {
  findById(reservationId: string): Promise<Reservation | null>;
}
