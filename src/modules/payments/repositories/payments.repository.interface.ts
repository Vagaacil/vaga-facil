import { Payment } from '../entities/payment.entity.js';

export const PAYMENTS_REPOSITORY = 'PAYMENTS_REPOSITORY';

export interface PaymentsRepository {
  findByReservationId(reservationId: string): Promise<Payment | null>;
}
