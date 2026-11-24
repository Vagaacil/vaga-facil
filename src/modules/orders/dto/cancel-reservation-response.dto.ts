import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';

export class CancelReservationResponseDto {
  constructor(
    public readonly reservationId: string,
    public readonly reservationStatus: ReservationStatusEnum,
  ) {}
}
