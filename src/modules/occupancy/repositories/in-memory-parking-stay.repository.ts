import { Injectable } from '@nestjs/common';
import { ParkingStay } from '../entities/parking-stay.entity.js';
import { IParkingStayRepository } from './parking-stay.repository.interface.js';

@Injectable()
export class InMemoryParkingStayRepository implements IParkingStayRepository {
  private readonly parkingStays = new Map<string, ParkingStay>([
    [
      'stay-1',
      new ParkingStay(
        'stay-1',
        'ABC-1234',
        'spot-1',
        new Date(Date.now() - 150 * 60 * 1000),
        18,
      ),
    ],
  ]);

  async findById(parkingStayId: string): Promise<ParkingStay | null> {
    return await Promise.resolve(this.parkingStays.get(parkingStayId) ?? null);
  }

  async save(parkingStay: ParkingStay): Promise<ParkingStay> {
    this.parkingStays.set(parkingStay.parkingStayId, parkingStay);
    return await Promise.resolve(parkingStay);
  }
}
