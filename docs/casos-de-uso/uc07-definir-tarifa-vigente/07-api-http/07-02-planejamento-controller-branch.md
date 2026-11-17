# UC07 - Planejamento HTTP e branch

**Caso:** UC07 - Definir Tarifa Vigente
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios/:patioId/tarifas; GET /patios/:patioId/tarifa-vigente`

## Branch dependency
```text
main (18c80b4)
  -> feature/implementacao-uc01-uc10 (6e6efc9; existing Material 06 branch)
       -> current Material 07/08 working-tree edits (not committed)
```

The existing branch contains the GREEN services and modules. No new branch or PR base was changed. PR chain and remote Sub-Issue must be confirmed after GH authentication.

## Technical plan
| Component | Real file/contract | Planned change and acceptance | Verification |
|---|---|---|---|
| Controller | [src/modules/occupancy/controllers/tarifas.controller.ts](../../../../src/modules/occupancy/controllers/tarifas.controller.ts); `ParkingOperationsService.definirTarifa; tarifaVigente` | DTO/params in, delegate, HTTP result out | Boundary + AppModule tests |
| DTO | [src/modules/occupancy/dto/definir-tarifa.dto.ts](../../../../src/modules/occupancy/dto/definir-tarifa.dto.ts); `valorPorHora:number>0; fracaoMinutos?:int[1,60]; toleranciaMinutos?:int>=0; vigenteDesde?:ISO date string` | Validate body shape only; no domain rules | Invalid body -> 400 |
| ValidationPipe | `src/main.ts` | whitelist + transform | Live API startup/invalid request |
| Module/provider | `OccupancyModule` and `src/app.module.ts` | Preserve existing repository token/provider | Build and real AppModule test |
| HTTP tests | [test/http-boundary.e2e-spec.ts](../../../../test/http-boundary.e2e-spec.ts) | Vitest/Supertest, service mock only here | 12 tests |
| Integrated tests | [test/app.e2e-spec.ts](../../../../test/app.e2e-spec.ts) | Real AppModule/services/repositories | 7 tests |

GitHub IDs, assignees, WIP and PR target remain unverified; no remote operation was performed.
