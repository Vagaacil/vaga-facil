# UC02 - Diagnostico da fronteira HTTP

**Caso:** UC02 - Reservar Vaga
**Ator:** Motorista
**Rotas:** `POST /reservas`

## Componentes e contratos
- Controller: [src/modules/orders/controllers/reservas.controller.ts](../../../../src/modules/orders/controllers/reservas.controller.ts); Service: `OrdersService.reservarVaga`; feature module: `OrdersModule`.
- DTO: `reservar-vaga.dto`; input: `patioId:string, motoristaId:string, veiculoId:string, categoria?:string`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST /reservas`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OrdersModule` -> `OrdersService.reservarVaga`. |
| DoR-05 contracts | Confirmed | `patioId:string, motoristaId:string, veiculoId:string, categoria?:string`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
