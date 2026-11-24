import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReservationStatusEnum } from '../../../common/enums/reservation-status.enum.js';
import {
  ORDERS_REPOSITORY,
  type IOrdersRepository,
} from '../repositories/orders.repository.interface.js';

@Injectable()
export class ReservationEntryNotifier {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly repository: IOrdersRepository,
  ) {}

  async confirmarEntrada(reservaId: string): Promise<void> {
    const reserva = await this.repository.buscarReserva(reservaId);
    if (!reserva) {
      throw new NotFoundException({
        code: 'RESERVA_NAO_ENCONTRADA',
        message: 'A vaga retida não possui uma Reserva persistida.',
      });
    }
    if (reserva.getStatus() !== ReservationStatusEnum.CONFIRMED) {
      throw new Error('RESERVA_NAO_ATIVA_NA_ENTRADA');
    }
    reserva.concluir();
    await this.repository.salvarReserva(reserva);
  }

  async expirarReserva(reservaId: string, instante: Date): Promise<void> {
    const reserva = await this.repository.buscarReserva(reservaId);
    if (!reserva) {
      throw new NotFoundException({
        code: 'RESERVA_NAO_ENCONTRADA',
        message: 'A vaga retida não possui uma Reserva persistida.',
      });
    }
    if (reserva.expirar(instante)) {
      await this.repository.salvarReserva(reserva);
    }
  }
}
