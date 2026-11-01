import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import { Test } from '@nestjs/testing';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import { ReservationAlreadyConfirmedException } from '../../../common/exceptions/reservation-already-confirmed.exception.js';
import { ReservationNotFoundException } from '../../../common/exceptions/reservation-not-found.exception.js';
import { Reservation } from '../entities/reservation.entity.js';
import {
  IOrdersRepository,
  ORDERS_REPOSITORY,
} from '../repositories/orders.repository.interface.js';
import { OrdersService } from './orders.service.js';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let findByIdMock: ReturnType<typeof vi.fn>;
  let saveMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    findByIdMock = vi.fn();
    saveMock = vi.fn();

    const ordersRepositoryMock: Mocked<IOrdersRepository> = {
      findById: findByIdMock,
      save: saveMock,
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
  });

  it('throws when the reservation does not exist', async () => {
    findByIdMock.mockResolvedValue(null);

    await expect(ordersService.confirmOrder('1')).rejects.toThrow(
      ReservationNotFoundException,
    );
    expect(findByIdMock.mock.calls).toContainEqual(['1']);
  });

  it('confirms the reservation and returns its status', async () => {
    const reservation = new Reservation(
      '1',
      'spot-1',
      'user-1',
      new Date(),
      new Date(),
    );
    findByIdMock.mockResolvedValue(reservation);
    saveMock.mockResolvedValue(reservation);

    const response = await ordersService.confirmOrder('1');

    expect(reservation.getStatus()).toBe(ReservationStatusEnum.CONFIRMED);
    expect(response.reservationId).toBe('1');
    expect(response.reservationStatus).toBe(ReservationStatusEnum.CONFIRMED);
    expect(saveMock).toHaveBeenCalledWith(reservation);
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
    findByIdMock.mockResolvedValue(reservation);

    await expect(ordersService.confirmOrder('1')).rejects.toThrow(
      ReservationAlreadyConfirmedException,
    );
  });
});
