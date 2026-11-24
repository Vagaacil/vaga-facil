# UC10 - Diagnostico da arquitetura e linha de base

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

Controller `src/modules/occupancy/controllers/indicadores.controller.ts` -> `ParkingOperationsService.indicadores` -> `OccupancyModule` provider/token -> real in-memory adapter. DTO: `N/A`; fields: `patioId?:string route parameter; read-only, no body DTO`. Issue/Sub-Issue, assignees, WIP, PR and Project are not remotely verifiable.

Baseline `corepack pnpm test`: 6 files/31 tests passed at 15:01:51. Current suite: 8 files/45 passed at 15:11:54. Branch `feature/implementacao-uc01-uc10`, HEAD `6e6efc9`; current work remains uncommitted. Existing TypeORM adapters are not evidence of PostgreSQL runtime use.
