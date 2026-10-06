import { OrderStatusEnum } from '../../../common/enums/order-status.enum';

export class Order {
    private status: OrderStatusEnum;

    constructor(
        public readonly orderId: string,
        public readonly paymentId: string,
        status: OrderStatusEnum = OrderStatusEnum.PENDING,
        public amount: number,
        public paidat: Date,
        public readonly createdAt: Date = new Date(),
    ) {
        this.status = status ?? OrderStatusEnum.PENDING;
    }

    public getStatus(): OrderStatusEnum {
        return this.status;
    }

    public setStatus(status: OrderStatusEnum): void {
        this.status = status;
    }

    confirmOrder(): void {
        if (this.status === OrderStatusEnum.CONFIRMED) {
            throw new Error('Order is already confirmed.');
        }
        this.status = OrderStatusEnum.CONFIRMED;
    }
}