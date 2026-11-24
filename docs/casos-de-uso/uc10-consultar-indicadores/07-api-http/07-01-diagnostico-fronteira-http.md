# UC10 - Diagnostico da fronteira HTTP

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

## Componentes e contratos
- Controller: [src/modules/occupancy/controllers/indicadores.controller.ts](../../../../src/modules/occupancy/controllers/indicadores.controller.ts); Service: `ParkingOperationsService.indicadores`; feature module: `OccupancyModule`.
- DTO: N/A; input: `patioId?:string route parameter; read-only, no body DTO`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OccupancyModule` -> `ParkingOperationsService.indicadores`. |
| DoR-05 contracts | Confirmed | `patioId?:string route parameter; read-only, no body DTO`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
