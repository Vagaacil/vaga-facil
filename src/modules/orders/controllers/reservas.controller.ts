import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service.js';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  reservar(@Body() body: Record<string, unknown>) {
    return this.service.reservarVaga(
      typeof body?.patioId === 'string' ? body.patioId : '',
      body?.motoristaId,
      body?.veiculoId,
      body?.categoria,
    );
  }

  @Post(':reservaId/cancelar')
  cancelar(@Param('reservaId') reservaId: string) {
    return this.service.cancelarReserva(reservaId);
  }
}
