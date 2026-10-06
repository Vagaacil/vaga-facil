export class ReservationAlreadyConfirmedException extends Error {
    constructor() {
        super('Reservation is already confirmed.');
        this.name = 'ReservationAlreadyConfirmedException';
    }
}
