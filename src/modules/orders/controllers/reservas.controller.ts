import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReservarVagaDto } from '../dto/reservar-vaga.dto.js';
import { OrdersService } from '../services/orders.service.js';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  reservar(@Body() dto: ReservarVagaDto) {
    return this.service.reservarVaga(
      dto.patioId,
      dto.motoristaId,
      dto.veiculoId,
      dto.categoria,
    );
  }

  @Post(':reservaId/cancelar')
  cancelar(@Param('reservaId') reservaId: string) {
    return this.service.cancelarReserva(reservaId);
  }
}
