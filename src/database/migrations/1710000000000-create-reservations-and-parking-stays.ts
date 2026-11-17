import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReservationsAndParkingStays1710000000000
  implements MigrationInterface
{
  name = 'CreateReservationsAndParkingStays1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        columns: [
          {
            name: 'reservationId',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'parkingSpotId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'startsAt',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'endsAt',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
            default: `'pending'`,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'parking_stays',
        columns: [
          {
            name: 'parkingStayId',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'vehiclePlate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'parkingSpotId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'startedAt',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'hourlyRate',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
            default: `'open'`,
          },
          {
            name: 'endedAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'totalAmount',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parking_stays', true);
    await queryRunner.dropTable('reservations', true);
  }
}
