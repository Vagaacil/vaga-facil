export class ReservationAlreadyCancelledException extends Error {
  constructor() {
    super('The reservation has already been cancelled.');
    this.name = 'ReservationAlreadyCancelledException';
  }
}
