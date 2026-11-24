# UC04 - Diagnostico da arquitetura e linha de base

**Caso:** UC04 - Registrar Entrada
**Ator:** Motorista via Ponto de Acesso
**Rotas:** `POST /patios/:patioId/permanencias`

Controller `src/modules/occupancy/controllers/patios.controller.ts` -> `ParkingOperationsService.registrarEntrada` -> `OccupancyModule` provider/token -> real in-memory adapter. DTO: ``registrar-entrada.dto``; fields: `placa:string; patioId:string route parameter`. Issue/Sub-Issue, assignees, WIP, PR and Project are not remotely verifiable.

Baseline `corepack pnpm test`: 6 files/31 tests passed at 15:01:51. Current suite: 8 files/45 passed at 15:11:54. Branch `feature/implementacao-uc01-uc10`, HEAD `6e6efc9`; current work remains uncommitted. Existing TypeORM adapters are not evidence of PostgreSQL runtime use.
