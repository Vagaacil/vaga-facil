# UC07 - Controller e DTO

**Caso:** UC07 - Definir Tarifa Vigente
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios/:patioId/tarifas; GET /patios/:patioId/tarifa-vigente`

## Controller real
Source: [src/modules/occupancy/controllers/tarifas.controller.ts](../../../../src/modules/occupancy/controllers/tarifas.controller.ts)

```typescript
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { PatioNaoEncontradoError } from '../domain/parking-operations.errors.js';
import { DefinirTarifaDto } from '../dto/definir-tarifa.dto.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('patios/:patioId')
export class TarifasController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post('tarifas')
  async definir(
    @Param('patioId') patioId: string,
    @Body() dto: DefinirTarifaDto,
  ) {
    try {
      return await this.service.definirTarifa(
        patioId,
        dto.valorPorHora,
        dto.fracaoMinutos,
        dto.toleranciaMinutos,
        dto.vigenteDesde,
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
```

## DTO real
Source(s): [src/modules/occupancy/dto/definir-tarifa.dto.ts](../../../../src/modules/occupancy/dto/definir-tarifa.dto.ts)

### `src/modules/occupancy/dto/definir-tarifa.dto.ts`
```typescript
import {
  IsDateString,
  IsInt,
  IsNumber,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class DefinirTarifaDto {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0.01)
  valorPorHora!: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(1)
  @Max(60)
  fracaoMinutos?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  toleranciaMinutos?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsDateString()
  vigenteDesde?: string;
}
```

Fields: `valorPorHora:number>0; fracaoMinutos?:int[1,60]; toleranciaMinutos?:int>=0; vigenteDesde?:ISO date string`. The Controller only extracts input, calls `ParkingOperationsService.definirTarifa; tarifaVigente` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
