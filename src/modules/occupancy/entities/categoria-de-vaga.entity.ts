import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'parking_spot_categories' })
@Index('uq_category_code_per_patio', ['patioId', 'codigo'], { unique: true })
export class CategoriaDeVaga {
  @PrimaryColumn({ type: 'varchar' })
  public readonly categoriaId: string;

  @Column({ type: 'varchar' })
  public readonly patioId: string;

  @Column({ type: 'varchar' })
  public readonly codigo: string;

  @Column({ type: 'varchar' })
  public readonly descricao: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  public readonly tiposVeiculoCompativeis: string[];

  constructor(
    categoriaId = '',
    patioId = '',
    codigo = '',
    descricao = '',
    tiposVeiculoCompativeis: string[] = [],
  ) {
    this.categoriaId = categoriaId;
    this.patioId = patioId;
    this.codigo = codigo;
    this.descricao = descricao;
    this.tiposVeiculoCompativeis = tiposVeiculoCompativeis;
  }
}
