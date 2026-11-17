# UC05 - Diagnostico da arquitetura e linha de base

**Caso:** UC05 - Concluir Saida
**Ator:** Motorista
**Rotas:** `POST /permanencias/:registroId/checkout`

Controller `src/modules/occupancy/controllers/permanencias.controller.ts` -> `ParkingOperationsService.concluirSaida` -> `OccupancyModule` provider/token -> real in-memory adapter. DTO: `N/A`; fields: `registroId:string route parameter; request body absent`. Issue/Sub-Issue, assignees, WIP, PR and Project are not remotely verifiable.

Baseline `corepack pnpm test`: 6 files/31 tests passed at 15:01:51. Current suite: 8 files/45 passed at 15:11:54. Branch `feature/implementacao-uc01-uc10`, HEAD `6e6efc9`; current work remains uncommitted. Existing TypeORM adapters are not evidence of PostgreSQL runtime use.
