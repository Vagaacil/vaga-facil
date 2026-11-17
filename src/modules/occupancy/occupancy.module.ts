import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingStayController } from './controllers/parking-stay.controller.js';
import { ParkingStayOrmEntity } from './entities/parking-stay.orm-entity.js';
import { PARKING_STAY_REPOSITORY } from './repositories/parking-stay.repository.interface.js';
import { InMemoryParkingStayRepository } from './repositories/in-memory-parking-stay.repository.js';
import { TypeOrmParkingStayRepository } from './repositories/typeorm-parking-stay.repository.js';
import { ParkingStayService } from './services/parking-stay.service.js';

const repositoryProvider =
  process.env.DB_ENABLED === 'true'
    ? {
        provide: PARKING_STAY_REPOSITORY,
        useClass: TypeOrmParkingStayRepository,
      }
    : {
        provide: PARKING_STAY_REPOSITORY,
        useClass: InMemoryParkingStayRepository,
      };

@Module({
  imports:
    process.env.DB_ENABLED === 'true'
      ? [TypeOrmModule.forFeature([ParkingStayOrmEntity])]
      : [],
  controllers: [ParkingStayController],
  providers: [ParkingStayService, repositoryProvider],
  exports: [ParkingStayService],
})
export class OccupancyModule {}
