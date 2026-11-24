import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'current_tariffs' })
export class TarifaVigente {
  @PrimaryColumn({ type: 'varchar' })
  public readonly tarifaId: string;

  @Column({ type: 'varchar' })
  public readonly patioId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value),
    },
  })
  public readonly valorPorHora: number;

  @Column({ type: 'int', default: 60 })
  public readonly fracaoMinutos: number;

  @Column({ type: 'int', default: 0 })
  public readonly toleranciaMinutos: number;

  @Column({ type: 'timestamp with time zone' })
  public readonly vigenteDesde: Date;

  constructor(
    tarifaId = '',
    patioId = '',
    valorPorHora = 0,
    fracaoMinutos = 60,
    toleranciaMinutos = 0,
    vigenteDesde = new Date(),
  ) {
    this.tarifaId = tarifaId;
    this.patioId = patioId;
    this.valorPorHora = valorPorHora;
    this.fracaoMinutos = fracaoMinutos;
    this.toleranciaMinutos = toleranciaMinutos;
    this.vigenteDesde = vigenteDesde;
  }
}
