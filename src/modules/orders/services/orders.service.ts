import { Inject, Injectable } from '@nestjs/common';
import { ConfirmOrderResponseDto } from '../dto/confirm-order-response.dto';
import { ReservationNotFoundException } from '../../../common/exceptions/reservation-not-found.exception';
import {
  IOrdersRepository,
  ORDERS_REPOSITORY,
} from '../repositories/orders.repository.interface';

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
