import { TransacaoDePagamento } from '../entities/transacao-de-pagamento.entity.js';

export const PAYMENTS_REPOSITORY = 'PAYMENTS_REPOSITORY';

export interface PaymentsRepository {
  findByRegistroId(registroId: string): Promise<TransacaoDePagamento | null>;
  save(transacao: TransacaoDePagamento): Promise<TransacaoDePagamento>;
}
