# UC03 - Cancelar Reserva: 01 12 Relatorio Consistencia Cobertura

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Relatorio de consistencia**

## Cobertura
Implementacao: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

Teste rastreavel: reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.

Regras: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.

ultima suite real: 6 arquivos, 31 testes aprovados. Build e lint dirigido aprovados. Gap: PostgreSQL Nao foi iniciado; concorrencia multi-processo Nao foi empiricamente validada.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
