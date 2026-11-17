# UC02 - Reservar Vaga: 01 07 Plano Labels

**Ator:** Motorista
**Endpoint:** `POST /reservas`
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
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
