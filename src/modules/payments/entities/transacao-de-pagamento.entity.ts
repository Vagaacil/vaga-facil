import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum.js';

@Entity({ name: 'payment_transactions' })
@Index('uq_payment_permanencia', ['registroId'], { unique: true })
export class TransacaoDePagamento {
  @PrimaryColumn({ type: 'varchar' })
  public readonly transacaoId: string;

  @Column({ type: 'varchar' })
  public readonly registroId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value),
    },
  })
  public readonly valor: number;

  @Column({ type: 'varchar' })
  public readonly status: PaymentStatusEnum;

  @Column({ type: 'timestamp with time zone' })
  public readonly criadaEm: Date;

  constructor(
    transacaoId = '',
    registroId = '',
    valor = 0,
    status = PaymentStatusEnum.PENDING,
    criadaEm = new Date(),
  ) {
    this.transacaoId = transacaoId;
    this.registroId = registroId;
    this.valor = valor;
    this.status = status;
    this.criadaEm = criadaEm;
  }
}
