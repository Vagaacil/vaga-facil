# UC05 - Controller e DTO

**Caso:** UC05 - Concluir Saida
**Ator:** Motorista
**Rotas:** `POST /permanencias/:registroId/checkout`

## Controller real
Source: [src/modules/occupancy/controllers/permanencias.controller.ts](../../../../src/modules/occupancy/controllers/permanencias.controller.ts)

```typescript
import { Controller, HttpException, Param, Post } from '@nestjs/common';
import {
  PermanenciaJaFechadaError,
  PermanenciaNaoEncontradaError,
} from '../domain/parking-operations.errors.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller('permanencias')
export class PermanenciasController {
  constructor(private readonly service: ParkingOperationsService) {}

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
```

## DTO real
Source(s): N/A - endpoint sem body

No body DTO is appropriate for this route.

Fields: `registroId:string route parameter; request body absent`. The Controller only extracts input, calls `ParkingOperationsService.concluirSaida` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
