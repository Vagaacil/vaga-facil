# UC03 - Cancelar Reserva: 05 05 Evidencias Vitest

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Saida Vitest real**

## TDD GREEN - mapeamento
Teste: `reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.`

Producao: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

Aceite: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.

```text
$ corepack pnpm test
 RUN  v5.0.5 C:/Users/utfpr/Downloads/vaga-facil
 Test Files  6 passed (6)
      Tests  31 passed (31)
   Start at  14:49:29
   Duration  2.10s (import 68%, tests 17%, transform 15%)
```

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
