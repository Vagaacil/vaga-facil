# UC04 - Controller e DTO

**Caso:** UC04 - Registrar Entrada
**Ator:** Motorista via Ponto de Acesso
**Rotas:** `POST /patios/:patioId/permanencias`

## Controller real
Source: [src/modules/occupancy/controllers/patios.controller.ts](../../../../src/modules/occupancy/controllers/patios.controller.ts)

```typescript
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CriarPatioDto } from '../dto/criar-patio.dto.js';
import { CriarVagaDto } from '../dto/criar-vaga.dto.js';
import { RegistrarEntradaDto } from '../dto/registrar-entrada.dto.js';
import { ParkingOperationsService } from '../services/parking-operations.service.js';
import {
  PatioLotadoError,
  PatioNaoEncontradoError,
  VeiculoJaNoPatioError,
} from '../domain/parking-operations.errors.js';

@Controller('patios')
export class PatiosController {
  constructor(private readonly service: ParkingOperationsService) {}

  @Post()
  criar(@Body() dto: CriarPatioDto) {
    return this.service.criarPatio(dto.nome);
  }

  @Post(':patioId/vagas')
  async criarVaga(
    @Param('patioId') patioId: string,
    @Body() dto: CriarVagaDto,
  ) {
    try {
      return await this.service.criarVaga(patioId, dto.codigo, dto.categoria);
    } catch (error) {
      this.mapPatioError(error);
    }
  }

  @Get(':patioId/vagas')
  async listarVagas(@Param('patioId') patioId: string) {
    try {
      return await this.service.listarVagas(patioId);
    } catch (error) {
      this.mapPatioError(error);
    }
  }

  @Post(':patioId/permanencias')
  async registrarEntrada(
    @Param('patioId') patioId: string,
    @Body() dto: RegistrarEntradaDto,
    @Res({ passthrough: true })
    response: { setHeader(name: string, value: string): void },
  ) {
    try {
      const resultado = await this.service.registrarEntrada({
        patioId,
        placa: dto.placa,
      });
      response.setHeader(
        'Location',
        `/permanencias/${resultado.registro.registroId}`,
      );
      return {
        registroId: resultado.registro.registroId,
        patioId,
        vagaId: resultado.vaga.vagaId,
        codigoVaga: resultado.vaga.codigo,
        placa: resultado.registro.placa,
        horarioEntrada: resultado.registro.horarioEntrada,
      };
    } catch (error) {
      if (error instanceof PatioNaoEncontradoError) {
        throw new HttpException(
          { code: 'PATIO_NAO_ENCONTRADO', message: error.message },
          404,
        );
      }
      if (
        error instanceof PatioLotadoError ||
        error instanceof VeiculoJaNoPatioError
      ) {
        throw new HttpException(
          {
            code:
              error instanceof PatioLotadoError
                ? 'PATIO_LOTADO'
                : 'VEICULO_JA_NO_PATIO',
            message: error.message,
          },
          409,
        );
      }
      if (error instanceof Error && error.message === 'PLACA_INVALIDA') {
        throw new HttpException(
          { code: 'PLACA_INVALIDA', message: error.message },
          400,
        );
      }
      throw error;
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
Source(s): [src/modules/occupancy/dto/registrar-entrada.dto.ts](../../../../src/modules/occupancy/dto/registrar-entrada.dto.ts)

### `src/modules/occupancy/dto/registrar-entrada.dto.ts`
```typescript
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegistrarEntradaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  placa!: string;
}
```

Fields: `placa:string; patioId:string route parameter`. The Controller only extracts input, calls `ParkingOperationsService.registrarEntrada` and returns its result. DTO + ValidationPipe cover structural/basic HTTP input. Normalization, reservation eligibility, tariff/vacancy rules, payment and state transitions remain in application/domain. Route-only/read-only operations correctly have no body DTO.

Dependencies: `@nestjs/common`, `class-validator`, `class-transformer`. Boundary test result: 12/12; build passed.
