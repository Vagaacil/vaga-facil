import { Body, Controller, Param, Post } from '@nestjs/common';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('permanencias')
export class ImpedimentosSaidaController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post(':registroId/resolver-impedimento')
  resolver(
    @Param('registroId') registroId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.service.resolverImpedimentoSaida(
      registroId,
      body?.decisao,
      body?.justificativa,
      body?.operadorId,
    );
  }
}
