import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { VagaStatus } from './vaga-status.enum.js';

@Entity({ name: 'parking_spots' })
@Index('uq_spot_code_per_patio', ['patioId', 'codigo'], { unique: true })
export class Vaga {
  @PrimaryColumn({ type: 'varchar' })
  public readonly vagaId: string;

  @Column({ type: 'varchar' })
  public readonly patioId: string;

  @Column({ type: 'varchar' })
  public readonly codigo: string;

  @Column({ type: 'varchar', default: 'PADRAO' })
  public categoria: string;

  @Column({ type: 'varchar', default: VagaStatus.LIVRE })
  private status: VagaStatus;

  @Column({ type: 'varchar', nullable: true })
  private reservaId?: string;

  @Column({ type: 'varchar', nullable: true })
  private reservaPlaca?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  private reservaExpiraEm?: Date;

  constructor(
    vagaId = '',
    patioId = '',
    codigo = '',
    categoria = 'PADRAO',
    status = VagaStatus.LIVRE,
    reservaId?: string,
    reservaPlaca?: string,
    reservaExpiraEm?: Date,
  ) {
    this.vagaId = vagaId;
    this.patioId = patioId;
    this.codigo = codigo;
    this.categoria = categoria;
    this.status = status;
    this.reservaId = reservaId;
    this.reservaPlaca = reservaPlaca;
    this.reservaExpiraEm = reservaExpiraEm;
  }

  getStatus(): VagaStatus {
    return this.status;
  }

  reclassificar(categoria: string): void {
    if (this.status !== VagaStatus.LIVRE) {
      throw new Error('VAGA_INDISPONIVEL_PARA_RECLASSIFICACAO');
    }
    if (!categoria.trim()) {
      throw new Error('CATEGORIA_INVALIDA');
    }
    this.categoria = categoria;
  }

  ocupar(reservaId?: string, placa?: string): void {
    if (this.status === VagaStatus.OCUPADA) {
      throw new Error('VAGA_OCUPADA');
    }
    if (
      this.status === VagaStatus.RESERVADA &&
      (!reservaId ||
        reservaId !== this.reservaId ||
        !placa ||
        placa !== this.reservaPlaca)
    ) {
      throw new Error('RESERVA_NAO_AUTORIZADA');
    }
    this.status = VagaStatus.OCUPADA;
    this.reservaId = undefined;
    this.reservaPlaca = undefined;
    this.reservaExpiraEm = undefined;
  }

  liberar(): void {
    if (this.status !== VagaStatus.OCUPADA) {
      throw new Error('VAGA_NAO_OCUPADA');
    }
    this.status = VagaStatus.LIVRE;
    this.reservaId = undefined;
    this.reservaPlaca = undefined;
    this.reservaExpiraEm = undefined;
  }

  reter(reservaId: string, placa: string, expiraEm: Date): void {
    if (this.status !== VagaStatus.LIVRE) {
      throw new Error('VAGA_INDISPONIVEL');
    }
    if (!reservaId.trim()) {
      throw new Error('RESERVA_INVALIDA');
    }
    this.status = VagaStatus.RESERVADA;
    this.reservaId = reservaId;
    this.reservaPlaca = placa;
    this.reservaExpiraEm = expiraEm;
  }

  liberarRetencao(): void {
    if (this.status !== VagaStatus.RESERVADA) {
      throw new Error('VAGA_NAO_RESERVADA');
    }
    this.status = VagaStatus.LIVRE;
    this.reservaId = undefined;
    this.reservaPlaca = undefined;
    this.reservaExpiraEm = undefined;
  }

  getReservaId(): string | undefined {
    return this.reservaId;
  }

  getReservaPlaca(): string | undefined {
    return this.reservaPlaca;
  }

  retencaoExpirada(agora: Date): boolean {
    return (
      this.status === VagaStatus.RESERVADA &&
      this.reservaExpiraEm !== undefined &&
      this.reservaExpiraEm <= agora
    );
  }
}
