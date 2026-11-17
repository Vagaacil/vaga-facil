import { DataSource } from 'typeorm';
import { CreateReservationsAndParkingStays1710000000000 } from '../database/migrations/1710000000000-create-reservations-and-parking-stays.js';
import { ParkingStayOrmEntity } from '../modules/occupancy/entities/parking-stay.orm-entity.js';
import { ReservationOrmEntity } from '../modules/orders/entities/reservation.orm-entity.js';

const requiredTestSetting = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required PostgreSQL test setting: ${name}`);
  }
  return value;
};

export const createTestDataSource = (): DataSource => {
  const username = requiredTestSetting('TEST_DB_USERNAME');
  const password = requiredTestSetting('TEST_DB_PASSWORD');
  const database = requiredTestSetting('TEST_DB_NAME');
  const developmentUsername = process.env.POSTGRES_USER ?? 'postgres';
  const developmentPassword = process.env.POSTGRES_PASSWORD ?? 'postgres';
  const developmentDatabase = process.env.POSTGRES_DB ?? 'vaga_facil';

  if (
    username === developmentUsername ||
    password === developmentPassword ||
    database === developmentDatabase
  ) {
    throw new Error(
      'PostgreSQL integration tests require a database, username, and password distinct from development.',
    );
  }

  return new DataSource({
    type: 'postgres',
    host: requiredTestSetting('TEST_DB_HOST'),
    port: Number(requiredTestSetting('TEST_DB_PORT')),
    username,
    password,
    database,
    entities: [ReservationOrmEntity, ParkingStayOrmEntity],
    migrations: [CreateReservationsAndParkingStays1710000000000],
    synchronize: false,
    logging: false,
  });
};
