import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransacaoDePagamento } from '../entities/transacao-de-pagamento.entity.js';
import { PaymentsRepository } from './payments.repository.interface.js';

@Injectable()
export class TypeOrmPaymentsRepository implements PaymentsRepository {
  constructor(
    @InjectRepository(TransacaoDePagamento)
    private readonly transactions: Repository<TransacaoDePagamento>,
  ) {}

  findByRegistroId(registroId: string): Promise<TransacaoDePagamento | null> {
    return this.transactions.findOne({ where: { registroId } });
  }

  save(transacao: TransacaoDePagamento): Promise<TransacaoDePagamento> {
    return this.transactions.save(transacao);
  }
}
