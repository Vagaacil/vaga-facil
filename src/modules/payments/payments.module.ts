import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PAYMENT_GATEWAY_PORT,
  InMemoryPaymentGateway,
} from './domain/payment-gateway.port.js';
import { TransacaoDePagamento } from './entities/transacao-de-pagamento.entity.js';
import { InMemoryPaymentsRepository } from './repositories/in-memory-payments.repository.js';
import { PAYMENTS_REPOSITORY } from './repositories/payments.repository.interface.js';
import { TypeOrmPaymentsRepository } from './repositories/typeorm-payments.repository.js';
import { PaymentsService } from './services/payments.service.js';

const typeOrmEnabled = process.env.DB_ENABLED === 'true';

@Module({
  imports: typeOrmEnabled
    ? [TypeOrmModule.forFeature([TransacaoDePagamento])]
    : [],
  providers: [
    PaymentsService,
    {
      provide: PAYMENTS_REPOSITORY,
      useClass: typeOrmEnabled
        ? TypeOrmPaymentsRepository
        : InMemoryPaymentsRepository,
    },
    { provide: PAYMENT_GATEWAY_PORT, useClass: InMemoryPaymentGateway },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
