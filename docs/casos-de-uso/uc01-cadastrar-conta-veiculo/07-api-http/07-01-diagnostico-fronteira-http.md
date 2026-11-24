# UC01 - Diagnostico da fronteira HTTP

**Caso:** UC01 - Cadastrar Conta e Veiculo
**Ator:** Motorista
**Rotas:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`

## Componentes e contratos
- Controller: [src/modules/orders/controllers/motoristas.controller.ts](../../../../src/modules/orders/controllers/motoristas.controller.ts); Service: `OrdersService.cadastrarMotorista; cadastrarVeiculo`; feature module: `OrdersModule`.
- DTO: `cadastrar-motorista.dto`, `cadastrar-veiculo.dto`; input: `nome:string, email:email; placa:string, tipo?:string`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST /motoristas; POST /motoristas/:motoristaId/veiculos`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OrdersModule` -> `OrdersService.cadastrarMotorista; cadastrarVeiculo`. |
| DoR-05 contracts | Confirmed | `nome:string, email:email; placa:string, tipo?:string`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
