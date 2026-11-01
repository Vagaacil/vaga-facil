import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';

export class CheckoutParkingStayResponseDto {
  constructor(
    public readonly parkingStayId: string,
    public readonly vehiclePlate: string,
    public readonly parkingSpotId: string,
    public readonly status: ParkingStayStatusEnum,
    public readonly totalAmount: number,
    public readonly endedAt: Date,
  ) {}
}
