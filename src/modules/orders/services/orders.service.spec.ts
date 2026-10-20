import { Test } from '@nestjs/testing';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum';
import { ReservationAlreadyConfirmedException } from '../../../common/exceptions/reservation-already-confirmed.exception';
import { ReservationNotFoundException } from '../../../common/exceptions/reservation-not-found.exception';
import { Reservation } from '../entities/reservation.entity';
import {
  IOrdersRepository,
  ORDERS_REPOSITORY,
} from '../repositories/orders.repository.interface';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: jest.Mocked<IOrdersRepository>;

  beforeEach(async () => {
    const ordersRepositoryMock: jest.Mocked<IOrdersRepository> = {
      findById: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ORDERS_REPOSITORY,
          useValue: ordersRepositoryMock,
        },
      ],
    }).compile();

    ordersService = module.get(OrdersService);
    ordersRepository = module.get(ORDERS_REPOSITORY);
  });

  it('throws when the reservation does not exist', async () => {
    ordersRepository.findById.mockResolvedValue(null);

    await expect(ordersService.confirmOrder('1')).rejects.toThrow(
      ReservationNotFoundException,
    );
    expect(ordersRepository.findById).toHaveBeenCalledWith('1');
  });

  it('confirms the reservation and returns its status', async () => {
    const reservation = new Reservation(
      '1',
      'spot-1',
      'user-1',
      new Date(),
      new Date(),
    );
    ordersRepository.findById.mockResolvedValue(reservation);

    const response = await ordersService.confirmOrder('1');

    expect(reservation.getStatus()).toBe(ReservationStatusEnum.CONFIRMED);
    expect(response.reservationId).toBe('1');
    expect(response.reservationStatus).toBe(ReservationStatusEnum.CONFIRMED);
  });

  it('throws when the reservation has already been confirmed', async () => {
    const reservation = new Reservation(
      '1',
      'spot-1',
      'user-1',
      new Date(),
      new Date(),
      ReservationStatusEnum.CONFIRMED,
    );
    ordersRepository.findById.mockResolvedValue(reservation);

    await expect(ordersService.confirmOrder('1')).rejects.toThrow(
      ReservationAlreadyConfirmedException,
    );
  });
});
