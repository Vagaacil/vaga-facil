import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'drivers' })
@Index('uq_driver_email', ['email'], { unique: true })
export class Motorista {
  @PrimaryColumn({ type: 'varchar' })
  public readonly motoristaId: string;

  @Column({ type: 'varchar' })
  public readonly nome: string;

  @Column({ type: 'varchar' })
  public readonly email: string;

  constructor(motoristaId = '', nome = '', email = '') {
    this.motoristaId = motoristaId;
    this.nome = nome;
    this.email = email;
  }
}
