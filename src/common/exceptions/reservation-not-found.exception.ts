import { NotFoundException } from '@nestjs/common';

export class ReservationNotFoundException extends NotFoundException {
  constructor(reservationId: string) {
    super(`Reservation with id "${reservationId}" was not found.`);
    this.name = 'ReservationNotFoundException';
  }
}
