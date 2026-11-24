import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AssociarCategoriaVagaDto } from '../dto/associar-categoria-vaga.dto.js';
import { CriarCategoriaVagaDto } from '../dto/criar-categoria-vaga.dto.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('patios/:patioId')
export class CategoriasVagaController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post('categorias-vaga')
  criar(@Param('patioId') patioId: string, @Body() dto: CriarCategoriaVagaDto) {
    return this.service.criarCategoria(
      patioId,
      dto.codigo,
      dto.descricao,
      dto.tiposVeiculoCompativeis,
    );
  }

  @Get('categorias-vaga')
  listar(@Param('patioId') patioId: string) {
    return this.service.listarCategorias(patioId);
  }

  @Get('categorias-vaga/:categoriaId')
  buscar(
    @Param('patioId', ParseUUIDPipe) patioId: string,
    @Param('categoriaId', ParseUUIDPipe) categoriaId: string,
  ) {
    return this.service.buscarCategoria(patioId, categoriaId);
  }

  @Patch('vagas/:vagaId/categoria')
  associar(
    @Param('patioId') patioId: string,
    @Param('vagaId') vagaId: string,
    @Body() dto: AssociarCategoriaVagaDto,
  ) {
    return this.service.associarCategoria(patioId, vagaId, dto.categoria);
  }
}
