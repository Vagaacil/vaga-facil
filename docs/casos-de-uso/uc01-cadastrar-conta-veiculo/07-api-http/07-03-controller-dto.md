# UC01 - Controller e DTO

**Caso:** UC01 - Cadastrar Conta e Veiculo
**Ator:** Motorista
**Rotas:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`

## Controller real
Source: [src/modules/orders/controllers/motoristas.controller.ts](../../../../src/modules/orders/controllers/motoristas.controller.ts)

```typescript
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
```

## DTO real
Source(s): [src/modules/orders/dto/cadastrar-motorista.dto.ts](../../../../src/modules/orders/dto/cadastrar-motorista.dto.ts), [src/modules/orders/dto/cadastrar-veiculo.dto.ts](../../../../src/modules/orders/dto/cadastrar-veiculo.dto.ts)

### `src/modules/orders/dto/cadastrar-motorista.dto.ts`
```typescript
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CadastrarMotoristaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  nome!: string;

  @IsEmail()
  email!: string;
}
```

### `src/modules/orders/dto/cadastrar-veiculo.dto.ts`
```typescript
import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class CadastrarVeiculoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  placa!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  tipo?: string;
}
```

Fields: `nome:string, email:email; placa:string, tipo?:string`. The Controller only extracts input, calls `OrdersService.cadastrarMotorista; cadastrarVeiculo` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
