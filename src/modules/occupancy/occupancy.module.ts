import { Module } from '@nestjs/common';
import { ParkingStayController } from './controllers/parking-stay.controller.js';
import { PARKING_STAY_REPOSITORY } from './repositories/parking-stay.repository.interface.js';
import { InMemoryParkingStayRepository } from './repositories/in-memory-parking-stay.repository.js';
import { ParkingStayService } from './services/parking-stay.service.js';

@Module({
  controllers: [ParkingStayController],
  providers: [
    ParkingStayService,
    {
      provide: PARKING_STAY_REPOSITORY,
      useClass: InMemoryParkingStayRepository,
    },
  ],
  exports: [ParkingStayService],
})
export class OccupancyModule {}
