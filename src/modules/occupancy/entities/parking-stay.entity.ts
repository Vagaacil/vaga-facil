import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import { ParkingStayAlreadyClosedException } from '../../../common/exceptions/parking-stay-already-closed.exception.js';

export class ParkingStay {
  private status: ParkingStayStatusEnum;
  private endedAtValue?: Date;
  private totalAmountValue?: number;

  constructor(
    public readonly parkingStayId: string,
    public readonly vehiclePlate: string,
    public readonly parkingSpotId: string,
    public readonly startedAt: Date,
    public readonly hourlyRate: number,
    status: ParkingStayStatusEnum = ParkingStayStatusEnum.OPEN,
    public readonly createdAt: Date = new Date(),
  ) {
    this.status = status ?? ParkingStayStatusEnum.OPEN;
  }

  getStatus(): ParkingStayStatusEnum {
    return this.status;
  }

  getEndedAt(): Date | undefined {
    return this.endedAtValue;
  }

  getTotalAmount(): number | undefined {
    return this.totalAmountValue;
  }

  checkout(endedAt: Date): number {
    if (this.status === ParkingStayStatusEnum.CLOSED) {
      throw new ParkingStayAlreadyClosedException();
    }

    if (endedAt < this.startedAt) {
      throw new Error('Checkout time cannot be before the stay start time.');
    }

    const elapsedMinutes = Math.max(
      1,
      Math.ceil((endedAt.getTime() - this.startedAt.getTime()) / 60000),
    );
    const totalAmount = Number(
      ((elapsedMinutes / 60) * this.hourlyRate).toFixed(2),
    );

    this.status = ParkingStayStatusEnum.CLOSED;
    this.endedAtValue = endedAt;
    this.totalAmountValue = totalAmount;

    return totalAmount;
  }
}
