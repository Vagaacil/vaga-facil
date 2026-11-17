# UC07 - Diagnostico da arquitetura e linha de base

**Caso:** UC07 - Definir Tarifa Vigente
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios/:patioId/tarifas; GET /patios/:patioId/tarifa-vigente`

Controller `src/modules/occupancy/controllers/tarifas.controller.ts` -> `ParkingOperationsService.definirTarifa; tarifaVigente` -> `OccupancyModule` provider/token -> real in-memory adapter. DTO: ``definir-tarifa.dto``; fields: `valorPorHora:number>0; fracaoMinutos?:int[1,60]; toleranciaMinutos?:int>=0; vigenteDesde?:ISO date string`. Issue/Sub-Issue, assignees, WIP, PR and Project are not remotely verifiable.

Baseline `corepack pnpm test`: 6 files/31 tests passed at 15:01:51. Current suite: 8 files/45 passed at 15:11:54. Branch `feature/implementacao-uc01-uc10`, HEAD `6e6efc9`; current work remains uncommitted. Existing TypeORM adapters are not evidence of PostgreSQL runtime use.
