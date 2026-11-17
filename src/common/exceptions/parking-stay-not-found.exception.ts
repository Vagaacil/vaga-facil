import { NotFoundException } from '@nestjs/common';

export class ParkingStayNotFoundException extends NotFoundException {
  constructor(parkingStayId: string) {
    super(`Parking stay with id "${parkingStayId}" was not found.`);
    this.name = 'ParkingStayNotFoundException';
  }
}
