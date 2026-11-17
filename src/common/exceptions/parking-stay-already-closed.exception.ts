import { ConflictException } from '@nestjs/common';

export class ParkingStayAlreadyClosedException extends ConflictException {
  constructor() {
    super('Parking stay is already closed.');
    this.name = 'ParkingStayAlreadyClosedException';
  }
}
