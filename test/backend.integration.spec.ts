import { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { ParkingStayStatusEnum } from '../src/common/enums/parking-stay-status.enum.js';
import { ReservationStatusEnum } from '../src/common/enums/reservation-status.enum.js';
import { InMemoryOrdersRepository } from '../src/modules/orders/repositories/in-memory-orders.repository.js';
import {
  ORDERS_REPOSITORY,
  type IOrdersRepository,
} from '../src/modules/orders/repositories/orders.repository.interface.js';
import { InMemoryParkingStayRepository } from '../src/modules/occupancy/repositories/in-memory-parking-stay.repository.js';
import {
  PARKING_STAY_REPOSITORY,
  type IParkingStayRepository,
} from '../src/modules/occupancy/repositories/parking-stay.repository.interface.js';
import { OrdersController } from '../src/modules/orders/controllers/orders.controller.js';
import { OrdersService } from '../src/modules/orders/services/orders.service.js';

describe('Backend integration (Material 08)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('resolves the real in-memory repositories through the module tokens', () => {
    const ordersRepository = moduleRef.get<IOrdersRepository>(ORDERS_REPOSITORY);
    const parkingStayRepository = moduleRef.get<IParkingStayRepository>(
      PARKING_STAY_REPOSITORY,
    );

    expect(ordersRepository).toBeInstanceOf(InMemoryOrdersRepository);
    expect(parkingStayRepository).toBeInstanceOf(InMemoryParkingStayRepository);
  });

  it('executes the real order confirmation flow end-to-end', async () => {
    const response = await request(app.getHttpServer()).post(
      '/orders/reservation-1/confirm',
    );

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      reservationId: 'reservation-1',
      reservationStatus: ReservationStatusEnum.CONFIRMED,
    });

    const ordersRepository = moduleRef.get<IOrdersRepository>(ORDERS_REPOSITORY);
    const persistedReservation = await ordersRepository.findById('reservation-1');

    expect(persistedReservation?.getStatus()).toBe(
      ReservationStatusEnum.CONFIRMED,
    );
  });

  it('executes the real parking-stay checkout flow end-to-end', async () => {
    const response = await request(app.getHttpServer()).post(
      '/parking-stays/stay-1/checkout',
    );

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      parkingStayId: 'stay-1',
      vehiclePlate: 'ABC-1234',
      parkingSpotId: 'spot-1',
      status: ParkingStayStatusEnum.CLOSED,
    });
    expect(response.body.totalAmount).toBeGreaterThan(0);

    const parkingStayRepository = moduleRef.get<IParkingStayRepository>(
      PARKING_STAY_REPOSITORY,
    );
    const persistedStay = await parkingStayRepository.findById('stay-1');

    expect(persistedStay?.getStatus()).toBe(ParkingStayStatusEnum.CLOSED);
    expect(persistedStay?.getTotalAmount()).toBeGreaterThan(0);
  });

  it('fails when the repository provider is missing during isolated module resolution', async () => {
    await expect(
      Test.createTestingModule({
        controllers: [OrdersController],
        providers: [OrdersService],
      }).compile(),
    ).rejects.toThrow(/ORDERS_REPOSITORY|Nest can't resolve dependencies/i);
  });
});
