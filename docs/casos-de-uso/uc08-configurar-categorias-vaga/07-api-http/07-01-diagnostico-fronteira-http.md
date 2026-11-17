# UC08 - Diagnostico da fronteira HTTP

**Caso:** UC08 - Configurar Categorias de Vaga
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST/GET /patios/:patioId/categorias-vaga; PATCH /patios/:patioId/vagas/:vagaId/categoria`

## Componentes e contratos
- Controller: [src/modules/occupancy/controllers/categorias-vaga.controller.ts](../../../../src/modules/occupancy/controllers/categorias-vaga.controller.ts); Service: `ParkingOperationsService.criarCategoria; listarCategorias; associarCategoria`; feature module: `OccupancyModule`.
- DTO: `criar-categoria-vaga.dto`, `associar-categoria-vaga.dto`; input: `codigo:string, descricao:string, tiposVeiculoCompativeis?:string[]; categoria:string`.
- Application/domain rules and repository contracts are preserved; Issue/Sub-Issue number, assignee, reviewer and WIP are not verifiable without GitHub authentication.

## Definition of Ready
| Criterion | Result | Evidence |
|---|---|---|
| DoR-01 objective | Partial | UC objective is explicit; remote Issue unavailable. |
| DoR-02 scope | Confirmed locally | Routes are `POST/GET /patios/:patioId/categorias-vaga; PATCH /patios/:patioId/vagas/:vagaId/categoria`. |
| DoR-03 acceptance | Confirmed locally | Boundary valid/invalid tests and integrated flow exist. |
| DoR-04 dependencies | Confirmed locally | `OccupancyModule` -> `ParkingOperationsService.criarCategoria; listarCategorias; associarCategoria`. |
| DoR-05 contracts | Confirmed | `codigo:string, descricao:string, tiposVeiculoCompativeis?:string[]; categoria:string`. |
| DoR-06 responsible | Not verifiable | GitHub assignments unavailable. |
| DoR-07 planning review | Not verifiable | Remote review history unavailable. |

Baseline before this change: 6 test files/31 tests passed. GREEN code and module providers are in the local branch. Do not mark the remote Sub-Issue done.
