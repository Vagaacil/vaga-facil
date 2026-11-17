import { Injectable } from '@nestjs/common';
import { TransacaoDePagamento } from '../entities/transacao-de-pagamento.entity.js';
import { PaymentsRepository } from './payments.repository.interface.js';

@Injectable()
export class InMemoryPaymentsRepository implements PaymentsRepository {
  private readonly transactions = new Map<string, TransacaoDePagamento>();

  findByRegistroId(registroId: string): Promise<TransacaoDePagamento | null> {
    return Promise.resolve(this.transactions.get(registroId) ?? null);
  }

  save(transacao: TransacaoDePagamento): Promise<TransacaoDePagamento> {
    this.transactions.set(transacao.registroId, transacao);
    return Promise.resolve(transacao);
  }
}
