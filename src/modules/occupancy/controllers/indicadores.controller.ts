import { Controller, Get, Param } from '@nestjs/common';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller()
export class IndicadoresController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Get('indicadores/ocupacao')
  rede() {
    return this.service.indicadores();
  }

  @Get('patios/:patioId/indicadores')
  patio(@Param('patioId') patioId: string) {
    return this.service.indicadores(patioId);
  }
}
