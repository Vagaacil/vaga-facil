import { describe, expect, it, vi } from 'vitest';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import { ParkingStay } from '../entities/parking-stay.entity.js';
import { ParkingStayRecord } from '../entities/parking-stay.persistence.entity.js';
import { TypeOrmParkingStayRepository } from './typeorm-parking-stay.repository.js';
import { type Repository } from 'typeorm';

describe('TypeOrmParkingStayRepository', () => {
  it('maps the domain entity to the persistence record and back', async () => {
    const startedAt = new Date('2026-01-15T08:00:00Z');
    const endedAt = new Date('2026-01-15T10:30:00Z');
    const parkingStay = new ParkingStay(
      'stay-3',
      'ABC-9876',
      'spot-9',
      startedAt,
      18,
    );

    const total = parkingStay.checkout(endedAt);
    expect(total).toBe(45);

    const findOneMock = vi.fn().mockResolvedValue(null);
    const saveMock = vi.fn().mockImplementation((record: ParkingStayRecord) => {
      expect(record.parkingStayId).toBe('stay-3');
      expect(record.status).toBe(ParkingStayStatusEnum.CLOSED);
      expect(record.totalAmount).toBe(45);
      return Promise.resolve(record);
    });
    const repository = {
      findOne: findOneMock,
      save: saveMock,
    } as unknown as Repository<ParkingStayRecord>;

    const typeOrmRepository = new TypeOrmParkingStayRepository(repository);
    const saved = await typeOrmRepository.save(parkingStay);

    expect(saved.parkingStayId).toBe('stay-3');
    expect(saved.getStatus()).toBe(ParkingStayStatusEnum.CLOSED);
    expect(saved.getTotalAmount()).toBe(45);
    expect(saved.getEndedAt()).toEqual(endedAt);

    findOneMock.mockResolvedValue(ParkingStayRecord.fromDomain(saved));
    const found = await typeOrmRepository.findById('stay-3');

    expect(found).not.toBeNull();
    expect(found?.vehiclePlate).toBe('ABC-9876');
    expect(found?.getTotalAmount()).toBe(45);
  });
});
