import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'patios' })
export class Patio {
  @PrimaryColumn({ type: 'varchar' })
  public readonly patioId: string;

  @Column({ type: 'varchar' })
  public nome: string;

  constructor(patioId = '', nome = '') {
    this.patioId = patioId;
    this.nome = nome;
  }
}
