import { Inject, Injectable } from '@nestjs/common';
import { ConfirmOrderResponseDto } from '../dto/confirm-order-response.dto.js';
import { ReservationNotFoundException } from '../../../common/exceptions/reservation-not-found.exception.js';
import {
  ORDERS_REPOSITORY,
  type IOrdersRepository,
} from '../repositories/orders.repository.interface.js';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async confirmOrder(reservationId: string): Promise<ConfirmOrderResponseDto> {
    const reservation = await this.ordersRepository.findById(reservationId);

    if (!reservation) {
      throw new ReservationNotFoundException(reservationId);
    }

    reservation.confirmReservation();

    return new ConfirmOrderResponseDto(
      reservation.reservationId,
      reservation.getStatus(),
    );
  }
}
