import { Body, Controller, Param, Post } from '@nestjs/common';
import { CadastrarMotoristaDto } from '../dto/cadastrar-motorista.dto.js';
import { CadastrarVeiculoDto } from '../dto/cadastrar-veiculo.dto.js';
import { OrdersService } from '../services/orders.service.js';

@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  cadastrar(@Body() dto: CadastrarMotoristaDto) {
    return this.service.cadastrarMotorista(dto.nome, dto.email);
  }

  @Post(':motoristaId/veiculos')
  cadastrarVeiculo(
    @Param('motoristaId') motoristaId: string,
    @Body() dto: CadastrarVeiculoDto,
  ) {
    return this.service.cadastrarVeiculo(motoristaId, dto.placa, dto.tipo);
  }
}
