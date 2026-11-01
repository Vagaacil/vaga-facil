import { Controller, Param, Post } from '@nestjs/common';
import { ConfirmOrderResponseDto } from '../dto/confirm-order-response.dto.js';
import { OrdersService } from '../services/orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':reservationId/confirm')
  async confirmOrder(
    @Param('reservationId') reservationId: string,
  ): Promise<ConfirmOrderResponseDto> {
    return this.ordersService.confirmOrder(reservationId);
  }
}
