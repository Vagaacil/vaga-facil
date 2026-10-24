export class ReservationNotFoundException extends Error {
  constructor(reservationId: string) {
    super(`Reservation with id "${reservationId}" was not found.`);
    this.name = 'ReservationNotFoundException';
  }
}
