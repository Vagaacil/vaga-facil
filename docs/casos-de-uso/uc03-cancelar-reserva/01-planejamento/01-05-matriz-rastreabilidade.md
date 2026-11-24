# UC03 - Cancelar Reserva: 01 05 Matriz Rastreabilidade

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais. | src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts | reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts. |
| HTTP | `POST /reservas/:reservaId/cancelar` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
