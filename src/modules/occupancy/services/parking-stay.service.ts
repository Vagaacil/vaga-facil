import { Inject, Injectable } from '@nestjs/common';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import { ParkingStayNotFoundException } from '../../../common/exceptions/parking-stay-not-found.exception.js';
import { CheckoutParkingStayResponseDto } from '../dto/checkout-parking-stay-response.dto.js';
import {
  type IParkingStayRepository,
  PARKING_STAY_REPOSITORY,
} from '../repositories/parking-stay.repository.interface.js';

@Injectable()
export class ParkingStayService {
  constructor(
    @Inject(PARKING_STAY_REPOSITORY)
    private readonly parkingStayRepository: IParkingStayRepository,
  ) {}

  async checkoutParkingStay(
    parkingStayId: string,
    endedAt: Date = new Date(),
  ): Promise<CheckoutParkingStayResponseDto> {
    const parkingStay =
      await this.parkingStayRepository.findById(parkingStayId);

    if (!parkingStay) {
      throw new ParkingStayNotFoundException(parkingStayId);
    }

    const totalAmount = parkingStay.checkout(endedAt);
    await this.parkingStayRepository.save(parkingStay);

    return new CheckoutParkingStayResponseDto(
      parkingStay.parkingStayId,
      parkingStay.vehiclePlate,
      parkingStay.parkingSpotId,
      ParkingStayStatusEnum.CLOSED,
      totalAmount,
      parkingStay.getEndedAt() ?? endedAt,
    );
  }
}
