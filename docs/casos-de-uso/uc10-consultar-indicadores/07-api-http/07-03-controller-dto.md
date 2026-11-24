# UC10 - Controller e DTO

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

## Controller real
Source: [src/modules/occupancy/controllers/indicadores.controller.ts](../../../../src/modules/occupancy/controllers/indicadores.controller.ts)

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { ParkingOperationsService } from '../services/parking-operations.service.js';

@Controller()
export class IndicadoresController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Get('indicadores/ocupacao')
  rede() {
    return this.service.indicadores();
  }

  @Get('patios/:patioId/indicadores')
  patio(@Param('patioId') patioId: string) {
    return this.service.indicadores(patioId);
  }
}
```

## DTO real
Source(s): N/A - endpoint sem body

No body DTO is appropriate for this route.

Fields: `patioId?:string route parameter; read-only, no body DTO`. The Controller only extracts input, calls `ParkingOperationsService.indicadores` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
