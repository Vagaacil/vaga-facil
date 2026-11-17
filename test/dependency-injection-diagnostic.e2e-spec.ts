import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { CLOCK_PORT } from '../src/modules/occupancy/domain/clock.port.js';
import { ParkingOperationsService } from '../src/modules/occupancy/services/parking-operations.service.js';
import { OrdersController } from '../src/modules/orders/controllers/orders.controller.js';
import { ORDERS_REPOSITORY } from '../src/modules/orders/repositories/orders.repository.interface.js';
import { OrdersService } from '../src/modules/orders/services/orders.service.js';

describe('isolated repository-provider diagnostic', () => {
  it('reports the missing repository token without changing production modules', async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        { provide: ParkingOperationsService, useValue: {} },
        { provide: CLOCK_PORT, useValue: { agora: () => new Date() } },
      ],
    });

    await expect(moduleBuilder.compile()).rejects.toThrow(ORDERS_REPOSITORY);
  });
});
