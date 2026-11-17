# UC08 - Diagnostico da arquitetura e linha de base

**Caso:** UC08 - Configurar Categorias de Vaga
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST/GET /patios/:patioId/categorias-vaga; PATCH /patios/:patioId/vagas/:vagaId/categoria`

Controller `src/modules/occupancy/controllers/categorias-vaga.controller.ts` -> `ParkingOperationsService.criarCategoria; listarCategorias; associarCategoria` -> `OccupancyModule` provider/token -> real in-memory adapter. DTO: ``criar-categoria-vaga.dto`, `associar-categoria-vaga.dto``; fields: `codigo:string, descricao:string, tiposVeiculoCompativeis?:string[]; categoria:string`. Issue/Sub-Issue, assignees, WIP, PR and Project are not remotely verifiable.

Baseline `corepack pnpm test`: 6 files/31 tests passed at 15:01:51. Current suite: 8 files/45 passed at 15:11:54. Branch `feature/implementacao-uc01-uc10`, HEAD `6e6efc9`; current work remains uncommitted. Existing TypeORM adapters are not evidence of PostgreSQL runtime use.
