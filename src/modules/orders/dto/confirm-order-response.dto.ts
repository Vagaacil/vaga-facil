import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';

export class ConfirmOrderResponseDto {
  constructor(
    public reservationId: string,
    public reservationStatus: ReservationStatusEnum,
  ) {}
}
