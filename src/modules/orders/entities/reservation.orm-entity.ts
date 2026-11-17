import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';

@Entity({ name: 'reservations' })
export class ReservationOrmEntity {
  @PrimaryColumn({ type: 'varchar' })
  reservationId!: string;

  @Column({ type: 'varchar' })
  parkingSpotId!: string;

  @Column({ type: 'varchar' })
  userId!: string;

  @Column({ type: 'timestamp with time zone' })
  startsAt!: Date;

  @Column({ type: 'timestamp with time zone' })
  endsAt!: Date;

  @Column({ type: 'varchar', default: ReservationStatusEnum.PENDING })
  status!: ReservationStatusEnum;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
