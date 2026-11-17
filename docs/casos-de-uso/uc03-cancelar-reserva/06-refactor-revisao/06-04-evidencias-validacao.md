# UC03 - Cancelar Reserva: 06 04 Evidencias Validacao

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Evidencia real**

## Refactor e Revisao
Caso: Cancelar Reserva.

- Regras preservadas: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.
- Erros: 404 Reserva inexistente; 409 estado Nao cancelavel.
- Arquivos: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts
- Testes: reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.

```text
$ corepack pnpm test
 RUN  v5.0.5 C:/Users/utfpr/Downloads/vaga-facil
 Test Files  6 passed (6)
      Tests  31 passed (31)
   Start at  14:49:29
   Duration  2.10s (import 68%, tests 17%, transform 15%)
```

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
