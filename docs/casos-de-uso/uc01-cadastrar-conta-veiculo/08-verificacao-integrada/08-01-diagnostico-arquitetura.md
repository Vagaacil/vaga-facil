# UC01 - Diagnostico da arquitetura e linha de base

**Caso:** UC01 - Cadastrar Conta e Veiculo
**Ator:** Motorista
**Rotas:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`

Controller `src/modules/orders/controllers/motoristas.controller.ts` -> `OrdersService.cadastrarMotorista; cadastrarVeiculo` -> `OrdersModule` provider/token -> real in-memory adapter. DTO: ``cadastrar-motorista.dto`, `cadastrar-veiculo.dto``; fields: `nome:string, email:email; placa:string, tipo?:string`. Issue/Sub-Issue, assignees, WIP, PR and Project are not remotely verifiable.

Baseline `corepack pnpm test`: 6 files/31 tests passed at 15:01:51. Current suite: 8 files/45 passed at 15:11:54. Branch `feature/implementacao-uc01-uc10`, HEAD `6e6efc9`; current work remains uncommitted. Existing TypeORM adapters are not evidence of PostgreSQL runtime use.
