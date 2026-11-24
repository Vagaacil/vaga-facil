import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';

@Entity({ name: 'parking_stays' })
@Index('uq_open_stay_plate', ['placa'], {
  unique: true,
  where: '"status" = \'open\'',
})
@Index('uq_open_stay_spot', ['vagaId'], {
  unique: true,
  where: '"status" = \'open\'',
})
export class RegistroDePermanencia {
  @PrimaryColumn({ type: 'varchar' })
  public readonly registroId: string;

  @Column({ type: 'varchar' })
  public readonly placa: string;

  @Column({ type: 'varchar' })
  public readonly vagaId: string;

  @Column({ type: 'varchar' })
  public readonly patioId: string;

  @Column({ type: 'timestamp with time zone' })
  public readonly horarioEntrada: Date;

  @Column({ type: 'varchar', default: ParkingStayStatusEnum.OPEN })
  private status: ParkingStayStatusEnum;

  @Column({ type: 'timestamp with time zone', nullable: true })
  public horarioSaida?: Date;

  private constructor(
    registroId: string,
    placa: string,
    vagaId: string,
    patioId: string,
    horarioEntrada: Date,
    status: ParkingStayStatusEnum = ParkingStayStatusEnum.OPEN,
  ) {
    this.registroId = registroId;
    this.placa = placa;
    this.vagaId = vagaId;
    this.patioId = patioId;
    this.horarioEntrada = horarioEntrada;
    this.status = status;
  }

  static abrir(
    placa: string,
    vagaId: string,
    horarioEntrada: Date,
    patioId = '',
    registroId: string = randomUUID(),
  ): RegistroDePermanencia {
    return new RegistroDePermanencia(
      registroId,
      placa,
      vagaId,
      patioId,
      horarioEntrada,
    );
  }

  getStatus(): ParkingStayStatusEnum {
    return this.status;
  }

  fechar(horarioSaida: Date): void {
    if (this.status === ParkingStayStatusEnum.CLOSED) {
      throw new Error('PERMANENCIA_JA_FECHADA');
    }
    if (horarioSaida < this.horarioEntrada) {
      throw new Error('HORARIO_SAIDA_INVALIDO');
    }
    this.status = ParkingStayStatusEnum.CLOSED;
    this.horarioSaida = horarioSaida;
  }
}
