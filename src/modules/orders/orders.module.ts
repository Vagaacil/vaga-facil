import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller.js';
import { Reservation } from './entities/reservation.entity.js';
import { ORDERS_REPOSITORY } from './repositories/orders.repository.interface.js';
import { InMemoryOrdersRepository } from './repositories/in-memory-orders.repository.js';
import { TypeOrmOrdersRepository } from './repositories/typeorm-orders.repository.js';
import { OrdersService } from './services/orders.service.js';

const repositoryProvider =
  process.env.DB_ENABLED === 'true'
    ? {
        provide: ORDERS_REPOSITORY,
        useClass: TypeOrmOrdersRepository,
      }
    : {
        provide: ORDERS_REPOSITORY,
        useClass: InMemoryOrdersRepository,
      };

@Module({
  imports:
    process.env.DB_ENABLED === 'true'
      ? [TypeOrmModule.forFeature([Reservation])]
      : [],
  controllers: [OrdersController],
  providers: [OrdersService, repositoryProvider],
  exports: [OrdersService],
})
export class OrdersModule {}
