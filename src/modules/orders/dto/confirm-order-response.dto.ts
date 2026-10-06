import { ReservationStatusEnum } from "src/common/enums/reservation-status.enum";

export class ConfirmOrderResponseDto {
    constructor(
        public reservationId: string,
        public reservationStatus: ReservationStatusEnum,
    ) { }
}