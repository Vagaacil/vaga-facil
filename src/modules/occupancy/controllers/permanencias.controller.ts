import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  PermanenciaJaFechadaError,
  PermanenciaNaoEncontradaError,
} from '../domain/parking-operations.errors.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('permanencias')
export class PermanenciasController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Get(':registroId')
  buscar(@Param('registroId', ParseUUIDPipe) registroId: string) {
    return this.service.buscarPermanencia(registroId);
  }

  @Post(':registroId/checkout')
  async checkout(@Param('registroId') registroId: string) {
    try {
      return await this.service.concluirSaida(registroId);
    } catch (error) {
      if (error instanceof PermanenciaNaoEncontradaError) {
        throw new HttpException(
          {
            code: 'PERMANENCIA_NAO_ENCONTRADA',
            message: error.message,
          },
          404,
        );
      }
      if (error instanceof PermanenciaJaFechadaError) {
        throw new HttpException(
          { code: 'PERMANENCIA_JA_FECHADA', message: error.message },
          409,
        );
      }
      throw error;
    }
  }
}
