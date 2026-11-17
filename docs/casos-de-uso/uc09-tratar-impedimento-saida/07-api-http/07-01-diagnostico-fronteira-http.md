# UC09 - Diagnostico da fronteira HTTP

**Caso:** UC09 - Tratar Impedimento de Saida
**Ator:** Operador de Portaria
**Rotas:** `POST /permanencias/:registroId/resolver-impedimento`

## Componentes e contratos
- Controller: [src/modules/occupancy/controllers/impedimentos-saida.controller.ts](../../../../src/modules/occupancy/controllers/impedimentos-saida.controller.ts); Service: `ParkingOperationsService.resolverImpedimentoSaida`; feature module: `OccupancyModule`.
- DTO: `resolver-impedimento-saida.dto`; input: `decisao:DecisaoImpedimentoSaida; justificativa:string; operadorId:string`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST /permanencias/:registroId/resolver-impedimento`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OccupancyModule` -> `ParkingOperationsService.resolverImpedimentoSaida`. |
| DoR-05 contracts | Confirmed | `decisao:DecisaoImpedimentoSaida; justificativa:string; operadorId:string`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
