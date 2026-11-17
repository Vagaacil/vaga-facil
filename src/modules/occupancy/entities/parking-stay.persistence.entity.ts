import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import { ParkingStay } from './parking-stay.entity.js';

@Entity({ name: 'legacy_parking_stays' })
export class ParkingStayRecord {
  @PrimaryColumn({ type: 'varchar' })
  public parkingStayId: string;

  @Column({ type: 'varchar' })
  public vehiclePlate: string;

  @Column({ type: 'varchar' })
  public parkingSpotId: string;

  @Column({ type: 'timestamp with time zone' })
  public startedAt: Date;

  @Column({ type: 'double precision' })
  public hourlyRate: number;

  @Column({ type: 'varchar', default: ParkingStayStatusEnum.OPEN })
  public status: ParkingStayStatusEnum;

  @Column({ type: 'timestamp with time zone', nullable: true })
  public endedAt?: Date;

  @Column({ type: 'double precision', nullable: true })
  public totalAmount?: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  static fromDomain(parkingStay: ParkingStay): ParkingStayRecord {
    const record = new ParkingStayRecord();
    record.parkingStayId = parkingStay.parkingStayId;
    record.vehiclePlate = parkingStay.vehiclePlate;
    record.parkingSpotId = parkingStay.parkingSpotId;
    record.startedAt = parkingStay.startedAt;
    record.hourlyRate = parkingStay.hourlyRate;
    record.status = parkingStay.getStatus();
    record.endedAt = parkingStay.getEndedAt();
    record.totalAmount = parkingStay.getTotalAmount();
    record.createdAt = parkingStay.createdAt;
    return record;
  }

  toDomain(): ParkingStay {
    const parkingStay = new ParkingStay(
      this.parkingStayId,
      this.vehiclePlate,
      this.parkingSpotId,
      this.startedAt,
      this.hourlyRate,
      this.status,
      this.createdAt,
    );

    Object.assign(parkingStay, {
      endedAtValue: this.endedAt,
      totalAmountValue: this.totalAmount,
    });

    return parkingStay;
  }
}
