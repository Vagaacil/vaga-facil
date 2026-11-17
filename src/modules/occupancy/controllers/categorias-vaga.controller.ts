import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('patios/:patioId')
export class CategoriasVagaController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post('categorias-vaga')
  criar(
    @Param('patioId') patioId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.service.criarCategoria(
      patioId,
      body?.codigo,
      body?.descricao,
      body?.tiposVeiculoCompativeis,
    );
  }

  @Get('categorias-vaga')
  listar(@Param('patioId') patioId: string) {
    return this.service.listarCategorias(patioId);
  }

  @Patch('vagas/:vagaId/categoria')
  associar(
    @Param('patioId') patioId: string,
    @Param('vagaId') vagaId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.service.associarCategoria(patioId, vagaId, body?.categoria);
  }
}
