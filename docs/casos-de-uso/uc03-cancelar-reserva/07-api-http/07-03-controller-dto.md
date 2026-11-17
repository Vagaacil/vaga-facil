# UC03 - Controller e DTO

**Caso:** UC03 - Cancelar Reserva
**Ator:** Motorista
**Rotas:** `POST /reservas/:reservaId/cancelar`

## Controller real
Source: [src/modules/orders/controllers/reservas.controller.ts](../../../../src/modules/orders/controllers/reservas.controller.ts)

```typescript
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReservarVagaDto } from '../dto/reservar-vaga.dto.js';
import { OrdersService } from '../services/orders.service.js';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  reservar(@Body() dto: ReservarVagaDto) {
    return this.service.reservarVaga(
      dto.patioId,
      dto.motoristaId,
      dto.veiculoId,
      dto.categoria,
    );
  }

  @Post(':reservaId/cancelar')
  cancelar(@Param('reservaId') reservaId: string) {
    return this.service.cancelarReserva(reservaId);
  }
}
```

## DTO real
Source(s): N/A - endpoint sem body

No body DTO is appropriate for this route.

Fields: `reservaId:string route parameter; request body absent`. The Controller only extracts input, calls `OrdersService.cancelarReserva` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
