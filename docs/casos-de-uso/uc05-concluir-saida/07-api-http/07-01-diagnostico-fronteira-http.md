# UC05 - Diagnostico da fronteira HTTP

**Caso:** UC05 - Concluir Saida
**Ator:** Motorista
**Rotas:** `POST /permanencias/:registroId/checkout`

## Componentes e contratos
- Controller: [src/modules/occupancy/controllers/permanencias.controller.ts](../../../../src/modules/occupancy/controllers/permanencias.controller.ts); Service: `ParkingOperationsService.concluirSaida`; feature module: `OccupancyModule`.
- DTO: N/A; input: `registroId:string route parameter; request body absent`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST /permanencias/:registroId/checkout`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OccupancyModule` -> `ParkingOperationsService.concluirSaida`. |
| DoR-05 contracts | Confirmed | `registroId:string route parameter; request body absent`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
