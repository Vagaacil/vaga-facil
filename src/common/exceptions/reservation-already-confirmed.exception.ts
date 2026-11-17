import { ConflictException } from '@nestjs/common';

export class ReservationAlreadyConfirmedException extends ConflictException {
  constructor() {
    super('Reservation is already confirmed.');
    this.name = 'ReservationAlreadyConfirmedException';
  }
}
