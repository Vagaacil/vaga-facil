import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ParkingStayOrmEntity } from '../modules/occupancy/entities/parking-stay.orm-entity.js';
import { ReservationOrmEntity } from '../modules/orders/entities/reservation.orm-entity.js';
import { CreateReservationsAndParkingStays1710000000000 } from '../database/migrations/1710000000000-create-reservations-and-parking-stays.js';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env.POSTGRES_DB ?? 'vaga_facil',
  entities: [ReservationOrmEntity, ParkingStayOrmEntity],
  migrations: [CreateReservationsAndParkingStays1710000000000],
  synchronize: false,
  migrationsRun: true,
  logging: process.env.NODE_ENV !== 'production',
});
