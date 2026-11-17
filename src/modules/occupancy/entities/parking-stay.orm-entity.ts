import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';

@Entity({ name: 'parking_stays' })
export class ParkingStayOrmEntity {
  @PrimaryColumn({ type: 'varchar' })
  parkingStayId!: string;

  @Column({ type: 'varchar' })
  vehiclePlate!: string;

  @Column({ type: 'varchar' })
  parkingSpotId!: string;

  @Column({ type: 'timestamp with time zone' })
  startedAt!: Date;

  @Column({ type: 'double precision' })
  hourlyRate!: number;

  @Column({ type: 'varchar', default: ParkingStayStatusEnum.OPEN })
  status!: ParkingStayStatusEnum;

  @Column({ type: 'timestamp with time zone', nullable: true })
  endedAt?: Date | null;

  @Column({ type: 'float', nullable: true })
  totalAmount?: number | null;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
