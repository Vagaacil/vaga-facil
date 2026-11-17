# UC01 - Cadastrar Conta e Veiculo: 01 07 Plano Labels

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
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
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
