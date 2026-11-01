import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import { Test } from '@nestjs/testing';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import { ParkingStayNotFoundException } from '../../../common/exceptions/parking-stay-not-found.exception.js';
import { ParkingStayAlreadyClosedException } from '../../../common/exceptions/parking-stay-already-closed.exception.js';
import { ParkingStay } from '../entities/parking-stay.entity.js';
import {
  IParkingStayRepository,
  PARKING_STAY_REPOSITORY,
} from '../repositories/parking-stay.repository.interface.js';
import { ParkingStayService } from './parking-stay.service.js';

describe('ParkingStayService', () => {
  let parkingStayService: ParkingStayService;
  let parkingStayRepository: Mocked<IParkingStayRepository>;

  beforeEach(async () => {
    const parkingStayRepositoryMock: Mocked<IParkingStayRepository> = {
      findById: vi.fn(),
      save: vi.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        ParkingStayService,
        {
          provide: PARKING_STAY_REPOSITORY,
          useValue: parkingStayRepositoryMock,
        },
      ],
    }).compile();

    parkingStayService = module.get(ParkingStayService);
    parkingStayRepository = module.get(PARKING_STAY_REPOSITORY);
  });

  it('throws when the parking stay does not exist', async () => {
    parkingStayRepository.findById.mockResolvedValue(null);

    await expect(
      parkingStayService.checkoutParkingStay(
        'missing',
        new Date('2026-01-15T10:00:00Z'),
      ),
    ).rejects.toThrow(ParkingStayNotFoundException);
  });

  it('closes the stay and calculates the fare', async () => {
    const startedAt = new Date('2026-01-15T08:00:00Z');
    const endedAt = new Date('2026-01-15T10:30:00Z');
    const parkingStay = new ParkingStay(
      'stay-1',
      'ABC-1234',
      'spot-1',
      startedAt,
      18,
    );

    parkingStayRepository.findById.mockResolvedValue(parkingStay);
    parkingStayRepository.save.mockResolvedValue(parkingStay);

    const response = await parkingStayService.checkoutParkingStay(
      'stay-1',
      endedAt,
    );

    expect(response.parkingStayId).toBe('stay-1');
    expect(response.status).toBe(ParkingStayStatusEnum.CLOSED);
    expect(response.totalAmount).toBe(45);
    expect(response.vehiclePlate).toBe('ABC-1234');
    expect(parkingStay.getStatus()).toBe(ParkingStayStatusEnum.CLOSED);
  });

  it('throws when the stay is already closed', async () => {
    const parkingStay = new ParkingStay(
      'stay-2',
      'XYZ-9999',
      'spot-2',
      new Date('2026-01-15T08:00:00Z'),
      20,
    );
    parkingStay.checkout(new Date('2026-01-15T09:00:00Z'));
    parkingStayRepository.findById.mockResolvedValue(parkingStay);

    await expect(
      parkingStayService.checkoutParkingStay(
        'stay-2',
        new Date('2026-01-15T11:00:00Z'),
      ),
    ).rejects.toThrow(ParkingStayAlreadyClosedException);
  });
});
