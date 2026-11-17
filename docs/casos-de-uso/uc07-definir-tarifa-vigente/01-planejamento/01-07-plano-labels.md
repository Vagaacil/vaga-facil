# UC07 - Definir Tarifa Vigente: 01 07 Plano Labels

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
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
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
