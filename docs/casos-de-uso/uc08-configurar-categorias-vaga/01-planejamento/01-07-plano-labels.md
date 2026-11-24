# UC08 - Configurar Categorias de Vaga: 01 07 Plano Labels

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Plano de labels**

| Label | Aplicacao |
|---|---|
| epic | agrupador UC01-UC10 |
| feature | issue principal |
| subtask | SUB-01 a SUB-05 |
| domain | regra/invariante |
| persistence | adaptadores |
| api | contratos REST |
| test | Vitest |
| documentation | Materiais 01-06 |

Labels e cores estao no `scripts/setup-github-issues.ps1`; Nao foram criadas remotamente.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
