import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { PatioNaoEncontradoError } from '../domain/parking-operations.errors.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('patios/:patioId')
export class TarifasController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post('tarifas')
  async definir(
    @Param('patioId') patioId: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return await this.service.definirTarifa(
        patioId,
        body?.valorPorHora,
        body?.fracaoMinutos,
        body?.toleranciaMinutos,
        body?.vigenteDesde,
      );
    } catch (error) {
      this.mapPatioError(error);
    }
  }

  @Get('tarifa-vigente')
  async vigente(@Param('patioId') patioId: string) {
    try {
      return await this.service.tarifaVigente(patioId);
    } catch (error) {
      this.mapPatioError(error);
    }
  }

  private mapPatioError(error: unknown): never {
    if (error instanceof PatioNaoEncontradoError) {
      throw new HttpException(
        { code: 'PATIO_NAO_ENCONTRADO', message: error.message },
        404,
      );
    }
    throw error;
  }
}
