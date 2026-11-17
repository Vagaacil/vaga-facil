# UC02 - Reservar Vaga: 01 05 Matriz Rastreabilidade

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros. | src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts | reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts. |
| HTTP | `POST /reservas` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
