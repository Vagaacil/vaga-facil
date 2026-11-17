import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum.js';

export const PAYMENT_GATEWAY_PORT = 'PAYMENT_GATEWAY_PORT';

export interface PaymentGatewayPort {
  processar(input: {
    idempotencyKey: string;
    amount: number;
  }): Promise<PaymentStatusEnum.APPROVED | PaymentStatusEnum.REJECTED>;
}

export class InMemoryPaymentGateway implements PaymentGatewayPort {
  processar(): Promise<PaymentStatusEnum.APPROVED> {
    return Promise.resolve(PaymentStatusEnum.APPROVED);
  }
}
