import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum';
import { ReservationAlreadyConfirmedException } from '../../../common/exceptions/reservation-already-confirmed.exception';

export class Reservation {
    private status: ReservationStatusEnum;

    constructor(
        public readonly reservationId: string,
        public readonly parkingSpotId: string,
        public readonly userId: string,
        public startsAt: Date,
        public endsAt: Date,
        status: ReservationStatusEnum = ReservationStatusEnum.PENDING,
        public readonly createdAt: Date = new Date(),
    ) {
        this.status = status ?? ReservationStatusEnum.PENDING;
    }

    public getStatus(): ReservationStatusEnum {
        return this.status;
    }

    public setStatus(status: ReservationStatusEnum): void {
        this.status = status;
    }

    confirmReservation(): void {
        if (this.status === ReservationStatusEnum.CONFIRMED) {
            throw new ReservationAlreadyConfirmedException();
        }
        this.status = ReservationStatusEnum.CONFIRMED;
    }
}