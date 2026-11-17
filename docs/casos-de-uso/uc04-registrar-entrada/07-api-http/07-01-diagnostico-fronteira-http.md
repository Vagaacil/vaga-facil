# UC04 - Diagnostico da fronteira HTTP

**Caso:** UC04 - Registrar Entrada
**Ator:** Motorista via Ponto de Acesso
**Rotas:** `POST /patios/:patioId/permanencias`

## Componentes e contratos
- Controller: [src/modules/occupancy/controllers/patios.controller.ts](../../../../src/modules/occupancy/controllers/patios.controller.ts); Service: `ParkingOperationsService.registrarEntrada`; feature module: `OccupancyModule`.
- DTO: `registrar-entrada.dto`; input: `placa:string; patioId:string route parameter`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST /patios/:patioId/permanencias`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OccupancyModule` -> `ParkingOperationsService.registrarEntrada`. |
| DoR-05 contracts | Confirmed | `placa:string; patioId:string route parameter`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
