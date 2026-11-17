import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingStay } from '../entities/parking-stay.entity.js';
import { ParkingStayRecord } from '../entities/parking-stay.persistence.entity.js';
import { IParkingStayRepository } from './parking-stay.repository.interface.js';

@Injectable()
export class TypeOrmParkingStayRepository implements IParkingStayRepository {
  constructor(
    @InjectRepository(ParkingStayRecord)
    private readonly repository: Repository<ParkingStayRecord>,
  ) {}

  async findById(parkingStayId: string): Promise<ParkingStay | null> {
    const record = await this.repository.findOne({ where: { parkingStayId } });
    return record ? record.toDomain() : null;
  }

  async save(parkingStay: ParkingStay): Promise<ParkingStay> {
    const saved = await this.repository.save(ParkingStayRecord.fromDomain(parkingStay));
    return saved.toDomain();
  }
}
