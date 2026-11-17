import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DataSource } from 'typeorm';
import { createTestDataSource } from '../src/config/test-data-source.js';
import { ParkingStayStatusEnum } from '../src/common/enums/parking-stay-status.enum.js';
import { ReservationStatusEnum } from '../src/common/enums/reservation-status.enum.js';
import { ParkingStayOrmEntity } from '../src/modules/occupancy/entities/parking-stay.orm-entity.js';
import { ReservationOrmEntity } from '../src/modules/orders/entities/reservation.orm-entity.js';

const shouldRunPostgresIntegration =
  process.env.DB_ENABLED === 'true' && process.env.TEST_DB_ENABLED === 'true';

const describeIfPostgres = shouldRunPostgresIntegration ? describe : describe.skip;

describeIfPostgres('PostgreSQL integration (Material 09)', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = createTestDataSource();
    await dataSource.initialize();
    const [connectionInfo] = await dataSource.query(
      `SELECT current_database() AS current_database, current_user AS current_user, inet_server_port() AS server_port;`,
    );

    if (
      connectionInfo.current_database !== process.env.TEST_DB_NAME ||
      connectionInfo.current_user !== process.env.TEST_DB_USERNAME
    ) {
      throw new Error(
        'PostgreSQL connection identity does not match the configured test database and user.',
      );
    }

    await dataSource.runMigrations();
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('connects to the configured PostgreSQL test database', async () => {
    const [connectionInfo] = await dataSource.query(
      `SELECT current_database() AS current_database, current_user AS current_user, inet_server_port() AS server_port;`,
    );

    expect(connectionInfo.current_database).toBe(process.env.TEST_DB_NAME);
    expect(connectionInfo.current_user).toBe(process.env.TEST_DB_USERNAME);
    expect(connectionInfo.server_port).toBeGreaterThan(0);
  });

  it('persists a real reservation row and reads it back', async () => {
    const reservationId = randomUUID();
    const reservationRepository = dataSource.getRepository(ReservationOrmEntity);

    const reservation = reservationRepository.create({
      reservationId,
      parkingSpotId: 'spot-pg-1',
      userId: 'user-pg-1',
      startsAt: new Date(Date.now() - 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 60 * 60 * 1000),
      status: ReservationStatusEnum.PENDING,
    });

    await reservationRepository.save(reservation);

    const persisted = await reservationRepository.findOne({
      where: { reservationId },
    });

    expect(persisted).toBeTruthy();
    expect(persisted?.reservationId).toBe(reservationId);
    expect(persisted?.parkingSpotId).toBe('spot-pg-1');
    expect(persisted?.status).toBe(ReservationStatusEnum.PENDING);
  });

  it('persists a real parking stay row and reads it back', async () => {
    const parkingStayId = randomUUID();
    const parkingStayRepository = dataSource.getRepository(ParkingStayOrmEntity);

    const parkingStay = parkingStayRepository.create({
      parkingStayId,
      vehiclePlate: 'PG-TEST-1',
      parkingSpotId: 'spot-pg-2',
      startedAt: new Date(Date.now() - 90 * 60 * 1000),
      hourlyRate: 15.5,
      status: ParkingStayStatusEnum.OPEN,
      endedAt: null,
      totalAmount: null,
    });

    await parkingStayRepository.save(parkingStay);

    const persisted = await parkingStayRepository.findOne({
      where: { parkingStayId },
    });

    expect(persisted).toBeTruthy();
    expect(persisted?.parkingStayId).toBe(parkingStayId);
    expect(persisted?.vehiclePlate).toBe('PG-TEST-1');
    expect(persisted?.status).toBe(ParkingStayStatusEnum.OPEN);
  });
});
