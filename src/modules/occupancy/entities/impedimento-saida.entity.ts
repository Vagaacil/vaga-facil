import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum DecisaoImpedimentoSaida {
  LIBERAR_MANUALMENTE = 'LIBERAR_MANUALMENTE',
  MANTER_RETIDO = 'MANTER_RETIDO',
}

@Entity({ name: 'exit_impediments' })
export class ImpedimentoSaida {
  @PrimaryColumn({ type: 'varchar' })
  public readonly impedimentoId: string;

  @Column({ type: 'varchar' })
  public readonly registroId: string;

  @Column({ type: 'varchar' })
  public readonly decisao: DecisaoImpedimentoSaida;

  @Column({ type: 'varchar' })
  public readonly justificativa: string;

  @Column({ type: 'varchar' })
  public readonly operadorId: string;

  @Column({ type: 'timestamp with time zone' })
  public readonly resolvidoEm: Date;

  constructor(
    impedimentoId = '',
    registroId = '',
    decisao = DecisaoImpedimentoSaida.MANTER_RETIDO,
    justificativa = '',
    operadorId = '',
    resolvidoEm = new Date(),
  ) {
    this.impedimentoId = impedimentoId;
    this.registroId = registroId;
    this.decisao = decisao;
    this.justificativa = justificativa;
    this.operadorId = operadorId;
    this.resolvidoEm = resolvidoEm;
  }
}
