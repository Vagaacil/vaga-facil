import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import { ReservationAlreadyConfirmedException } from '../../../common/exceptions/reservation-already-confirmed.exception.js';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryColumn({ type: 'varchar' })
  public readonly reservationId: string;

  @Column({ type: 'varchar' })
  public readonly parkingSpotId: string;

  @Column({ type: 'varchar' })
  public readonly userId: string;

  @Column({ type: 'timestamp with time zone' })
  public startsAt: Date;

  @Column({ type: 'timestamp with time zone' })
  public endsAt: Date;

  @Column({
    type: 'varchar',
    default: ReservationStatusEnum.PENDING,
  })
  private status: ReservationStatusEnum;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public readonly createdAt: Date;

  constructor(
    reservationId: string,
    parkingSpotId: string,
    userId: string,
    startsAt: Date,
    endsAt: Date,
    status: ReservationStatusEnum = ReservationStatusEnum.PENDING,
    createdAt: Date = new Date(),
  ) {
    this.reservationId = reservationId;
    this.parkingSpotId = parkingSpotId;
    this.userId = userId;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.status = status ?? ReservationStatusEnum.PENDING;
    this.createdAt = createdAt;
  }

  public getStatus(): ReservationStatusEnum {
    return this.status;
  }

  public setStatus(status: ReservationStatusEnum): void {
    this.status = status;
  }

  confirmReservation(): void {
    if (this.status === ReservationStatusEnum.CONFIRMED) {
      throw new ReservationAlreadyConfirmedException();
    }
    this.status = ReservationStatusEnum.CONFIRMED;
  }
}
