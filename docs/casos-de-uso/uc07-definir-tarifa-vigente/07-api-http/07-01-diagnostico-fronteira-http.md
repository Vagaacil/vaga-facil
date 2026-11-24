# UC07 - Diagnostico da fronteira HTTP

**Caso:** UC07 - Definir Tarifa Vigente
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios/:patioId/tarifas; GET /patios/:patioId/tarifa-vigente`

## Componentes e contratos
- Controller: [src/modules/occupancy/controllers/tarifas.controller.ts](../../../../src/modules/occupancy/controllers/tarifas.controller.ts); Service: `ParkingOperationsService.definirTarifa; tarifaVigente`; feature module: `OccupancyModule`.
- DTO: `definir-tarifa.dto`; input: `valorPorHora:number>0; fracaoMinutos?:int[1,60]; toleranciaMinutos?:int>=0; vigenteDesde?:ISO date string`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST /patios/:patioId/tarifas; GET /patios/:patioId/tarifa-vigente`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OccupancyModule` -> `ParkingOperationsService.definirTarifa; tarifaVigente`. |
| DoR-05 contracts | Confirmed | `valorPorHora:number>0; fracaoMinutos?:int[1,60]; toleranciaMinutos?:int>=0; vigenteDesde?:ISO date string`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
