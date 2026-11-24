import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ResolverImpedimentoSaidaDto } from '../dto/resolver-impedimento-saida.dto.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('permanencias')
export class ImpedimentosSaidaController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post(':registroId/resolver-impedimento')
  resolver(
    @Param('registroId') registroId: string,
    @Body() dto: ResolverImpedimentoSaidaDto,
  ) {
    return this.service.resolverImpedimentoSaida(
      registroId,
      dto.decisao,
      dto.justificativa,
      dto.operadorId,
    );
  }

  @Get(':registroId/impedimentos')
  listar(@Param('registroId', ParseUUIDPipe) registroId: string) {
    return this.service.listarImpedimentos(registroId);
  }
}
