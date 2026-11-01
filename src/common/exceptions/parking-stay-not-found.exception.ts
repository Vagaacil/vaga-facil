export class ParkingStayNotFoundException extends Error {
  constructor(parkingStayId: string) {
    super(`Parking stay with id "${parkingStayId}" was not found.`);
    this.name = 'ParkingStayNotFoundException';
  }
}
