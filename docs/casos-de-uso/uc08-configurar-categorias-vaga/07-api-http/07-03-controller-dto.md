# UC08 - Controller e DTO

**Caso:** UC08 - Configurar Categorias de Vaga
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST/GET /patios/:patioId/categorias-vaga; PATCH /patios/:patioId/vagas/:vagaId/categoria`

## Controller real
Source: [src/modules/occupancy/controllers/categorias-vaga.controller.ts](../../../../src/modules/occupancy/controllers/categorias-vaga.controller.ts)

```typescript
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch('vagas/:vagaId/categoria')
  associar(
    @Param('patioId') patioId: string,
    @Param('vagaId') vagaId: string,
    @Body() dto: AssociarCategoriaVagaDto,
  ) {
    return this.service.associarCategoria(patioId, vagaId, dto.categoria);
  }
}
```

## DTO real
Source(s): [src/modules/occupancy/dto/criar-categoria-vaga.dto.ts](../../../../src/modules/occupancy/dto/criar-categoria-vaga.dto.ts), [src/modules/occupancy/dto/associar-categoria-vaga.dto.ts](../../../../src/modules/occupancy/dto/associar-categoria-vaga.dto.ts)

### `src/modules/occupancy/dto/criar-categoria-vaga.dto.ts`
```typescript
import {
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CriarCategoriaVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  descricao!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @IsString({ each: true })
  tiposVeiculoCompativeis?: string[];
}
```

### `src/modules/occupancy/dto/associar-categoria-vaga.dto.ts`
```typescript
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AssociarCategoriaVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  categoria!: string;
}
```

Fields: `codigo:string, descricao:string, tiposVeiculoCompativeis?:string[]; categoria:string`. The Controller only extracts input, calls `ParkingOperationsService.criarCategoria; listarCategorias; associarCategoria` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
