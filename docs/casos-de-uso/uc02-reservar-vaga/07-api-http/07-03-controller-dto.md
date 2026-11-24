# UC02 - Controller e DTO

**Caso:** UC02 - Reservar Vaga
**Ator:** Motorista
**Rotas:** `POST /reservas`

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
Source(s): [src/modules/orders/dto/reservar-vaga.dto.ts](../../../../src/modules/orders/dto/reservar-vaga.dto.ts)

### `src/modules/orders/dto/reservar-vaga.dto.ts`
```typescript
import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class ReservarVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  patioId!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  motoristaId!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  veiculoId!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  categoria?: string;
}
```

Fields: `patioId:string, motoristaId:string, veiculoId:string, categoria?:string`. The Controller only extracts input, calls `OrdersService.reservarVaga` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
