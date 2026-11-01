import { ParkingStay } from '../entities/parking-stay.entity.js';

export const PARKING_STAY_REPOSITORY = 'PARKING_STAY_REPOSITORY';

export interface IParkingStayRepository {
  findById(parkingStayId: string): Promise<ParkingStay | null>;
  save(parkingStay: ParkingStay): Promise<ParkingStay>;
}
