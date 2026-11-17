import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingStay } from '../entities/parking-stay.entity.js';
import { ParkingStayOrmEntity } from '../entities/parking-stay.orm-entity.js';
import { ParkingStayMapper } from '../mappers/parking-stay.mapper.js';
import { IParkingStayRepository } from './parking-stay.repository.interface.js';

@Injectable()
export class TypeOrmParkingStayRepository implements IParkingStayRepository {
  constructor(
    @InjectRepository(ParkingStayOrmEntity)
    private readonly repository: Repository<ParkingStayOrmEntity>,
  ) {}

  async findById(parkingStayId: string): Promise<ParkingStay | null> {
    const parkingStayOrm = await this.repository.findOne({
      where: { parkingStayId },
    });

    return parkingStayOrm ? ParkingStayMapper.toDomain(parkingStayOrm) : null;
  }

  async save(parkingStay: ParkingStay): Promise<ParkingStay> {
    const parkingStayOrm = ParkingStayMapper.toOrm(parkingStay);
    const saved = await this.repository.save(parkingStayOrm);
    return ParkingStayMapper.toDomain(saved);
  }
}
