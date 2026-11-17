import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'registered_vehicles' })
@Index('uq_registered_vehicle_plate', ['placa'], { unique: true })
export class Veiculo {
  @PrimaryColumn({ type: 'varchar' })
  public readonly veiculoId: string;

  @Column({ type: 'varchar' })
  public readonly motoristaId: string;

  @Column({ type: 'varchar' })
  public readonly placa: string;

  @Column({ type: 'varchar', default: 'CARRO' })
  public readonly tipo: string;

  constructor(veiculoId = '', motoristaId = '', placa = '', tipo = 'CARRO') {
    this.veiculoId = veiculoId;
    this.motoristaId = motoristaId;
    this.placa = placa;
    this.tipo = tipo;
  }
}
