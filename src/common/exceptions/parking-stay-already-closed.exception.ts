export class ParkingStayAlreadyClosedException extends Error {
  constructor() {
    super('Parking stay is already closed.');
    this.name = 'ParkingStayAlreadyClosedException';
  }
}
