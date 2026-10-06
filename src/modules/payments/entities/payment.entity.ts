import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum';

export class Payment {
    private status: PaymentStatusEnum;

    constructor(
        public readonly paymentId: string,
        public readonly reservationId: string,
        status: PaymentStatusEnum,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deletedAt: Date | null = null,
    ) {
        this.status = status ?? PaymentStatusEnum.PENDING;
    }
}