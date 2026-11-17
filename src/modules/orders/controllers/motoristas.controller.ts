import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service.js';

@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  cadastrar(@Body() body: Record<string, unknown>) {
    return this.service.cadastrarMotorista(body?.nome, body?.email);
  }

  @Post(':motoristaId/veiculos')
  cadastrarVeiculo(
    @Param('motoristaId') motoristaId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.service.cadastrarVeiculo(motoristaId, body?.placa, body?.tipo);
  }
}
