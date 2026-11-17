import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum.js';
import {
  PAYMENT_GATEWAY_PORT,
  type PaymentGatewayPort,
} from '../domain/payment-gateway.port.js';
import { TransacaoDePagamento } from '../entities/transacao-de-pagamento.entity.js';
import {
  PAYMENTS_REPOSITORY,
  type PaymentsRepository,
} from '../repositories/payments.repository.interface.js';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENTS_REPOSITORY)
    private readonly repository: PaymentsRepository,
    @Inject(PAYMENT_GATEWAY_PORT)
    private readonly gateway: PaymentGatewayPort,
  ) {}

  async processar(
    registroId: string,
    valor: number,
  ): Promise<TransacaoDePagamento> {
    const existing = await this.repository.findByRegistroId(registroId);
    if (existing) {
      return existing;
    }

    let status: PaymentStatusEnum.APPROVED | PaymentStatusEnum.REJECTED;
    try {
      status = await this.gateway.processar({
        idempotencyKey: registroId,
        amount: valor,
      });
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        throw error;
      }
      throw new ServiceUnavailableException({
        code: 'GATEWAY_INDISPONIVEL',
        message: 'O gateway de pagamento está indisponível.',
      });
    }

    return this.repository.save(
      new TransacaoDePagamento(randomUUID(), registroId, valor, status),
    );
  }
}
