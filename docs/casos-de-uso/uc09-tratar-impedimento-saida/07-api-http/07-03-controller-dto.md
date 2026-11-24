# UC09 - Controller e DTO

**Caso:** UC09 - Tratar Impedimento de Saida
**Ator:** Operador de Portaria
**Rotas:** `POST /permanencias/:registroId/resolver-impedimento`

## Controller real
Source: [src/modules/occupancy/controllers/impedimentos-saida.controller.ts](../../../../src/modules/occupancy/controllers/impedimentos-saida.controller.ts)

```typescript
import { Body, Controller, Param, Post } from '@nestjs/common';
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
}
```

## DTO real
Source(s): [src/modules/occupancy/dto/resolver-impedimento-saida.dto.ts](../../../../src/modules/occupancy/dto/resolver-impedimento-saida.dto.ts)

### `src/modules/occupancy/dto/resolver-impedimento-saida.dto.ts`
```typescript
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { DecisaoImpedimentoSaida } from '../entities/impedimento-saida.entity.js';

export class ResolverImpedimentoSaidaDto {
  @IsEnum(DecisaoImpedimentoSaida)
  decisao!: DecisaoImpedimentoSaida;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  justificativa!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  operadorId!: string;
}
```

Fields: `decisao:DecisaoImpedimentoSaida; justificativa:string; operadorId:string`. The Controller only extracts input, calls `ParkingOperationsService.resolverImpedimentoSaida` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
