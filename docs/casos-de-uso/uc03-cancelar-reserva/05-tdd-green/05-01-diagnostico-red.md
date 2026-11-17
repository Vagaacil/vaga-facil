# UC03 - Cancelar Reserva: 05 01 Diagnostico Red

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Diagnostico RED**

## TDD GREEN - mapeamento
Teste: `reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.`

Producao: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

Aceite: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
