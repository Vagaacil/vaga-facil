import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';

@Entity({ name: 'reservations_v2' })
@Index('uq_active_reservation_vehicle', ['veiculoId'], {
  unique: true,
  where: '"status" = \'confirmed\'',
})
export class Reserva {
  @PrimaryColumn({ type: 'varchar' })
  public readonly reservaId: string;

  @Column({ type: 'varchar' })
  public readonly patioId: string;

  @Column({ type: 'varchar' })
  public readonly vagaId: string;

  @Column({ type: 'varchar' })
  public readonly motoristaId: string;

  @Column({ type: 'varchar' })
  public readonly veiculoId: string;

  @Column({ type: 'varchar' })
  public readonly placa: string;

  @Column({ type: 'varchar' })
  public readonly categoria: string;

  @Column({ type: 'timestamp with time zone' })
  public readonly expiraEm: Date;

  @Column({ type: 'varchar', default: ReservationStatusEnum.CONFIRMED })
  private status: ReservationStatusEnum;

  @Column({ type: 'timestamp with time zone' })
  public readonly criadaEm: Date;

  constructor(
    reservaId = '',
    patioId = '',
    vagaId = '',
    motoristaId = '',
    veiculoId = '',
    placa = '',
    categoria = 'PADRAO',
    expiraEm = new Date(),
    status = ReservationStatusEnum.CONFIRMED,
    criadaEm = new Date(),
  ) {
    this.reservaId = reservaId;
    this.patioId = patioId;
    this.vagaId = vagaId;
    this.motoristaId = motoristaId;
    this.veiculoId = veiculoId;
    this.placa = placa;
    this.categoria = categoria;
    this.expiraEm = expiraEm;
    this.status = status;
    this.criadaEm = criadaEm;
  }

  getStatus(): ReservationStatusEnum {
    return this.status;
  }

  cancelar(): void {
    if (this.status !== ReservationStatusEnum.CONFIRMED) {
      throw new Error('RESERVA_NAO_ATIVA');
    }
    this.status = ReservationStatusEnum.CANCELLED;
  }

  expirar(agora: Date): boolean {
    if (
      this.status !== ReservationStatusEnum.CONFIRMED ||
      this.expiraEm > agora
    ) {
      return false;
    }
    this.status = ReservationStatusEnum.CANCELLED;
    return true;
  }

  concluir(): void {
    this.status = ReservationStatusEnum.COMPLETED;
  }
}
