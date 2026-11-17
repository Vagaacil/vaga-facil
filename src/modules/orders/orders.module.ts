import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller.js';
import { MotoristasController } from './controllers/motoristas.controller.js';
import { ReservasController } from './controllers/reservas.controller.js';
import { Reservation } from './entities/reservation.entity.js';
import { Motorista } from './entities/motorista.entity.js';
import { Veiculo } from './entities/veiculo.entity.js';
import { Reserva } from './entities/reserva.entity.js';
import { ORDERS_REPOSITORY } from './repositories/orders.repository.interface.js';
import { InMemoryOrdersRepository } from './repositories/in-memory-orders.repository.js';
import { TypeOrmOrdersRepository } from './repositories/typeorm-orders.repository.js';
import { OrdersService } from './services/orders.service.js';
import { OccupancyModule } from '../occupancy/occupancy.module.js';
import { RESERVATION_ENTRY_PORT } from '../occupancy/domain/reservation-entry.port.js';
import { ReservationEntryNotifier } from './services/reservation-entry.notifier.js';

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

@Global()
@Module({
  imports: [
    OccupancyModule,
    ...(process.env.DB_ENABLED === 'true'
      ? [TypeOrmModule.forFeature([Reservation, Motorista, Veiculo, Reserva])]
      : []),
  ],
  controllers: [OrdersController, MotoristasController, ReservasController],
  providers: [
    OrdersService,
    ReservationEntryNotifier,
    {
      provide: RESERVATION_ENTRY_PORT,
      useExisting: ReservationEntryNotifier,
    },
    repositoryProvider,
  ],
  exports: [OrdersService, RESERVATION_ENTRY_PORT],
})
export class OrdersModule {}
