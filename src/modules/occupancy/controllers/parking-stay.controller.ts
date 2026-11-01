import { Controller, Param, Post } from '@nestjs/common';
import { CheckoutParkingStayResponseDto } from '../dto/checkout-parking-stay-response.dto.js';
import { ParkingStayService } from '../services/parking-stay.service.js';

@Controller('parking-stays')
export class ParkingStayController {
  constructor(private readonly parkingStayService: ParkingStayService) {}

  @Post(':parkingStayId/checkout')
  async checkout(
    @Param('parkingStayId') parkingStayId: string,
  ): Promise<CheckoutParkingStayResponseDto> {
    return this.parkingStayService.checkoutParkingStay(parkingStayId);
  }
}
