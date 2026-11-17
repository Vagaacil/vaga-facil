# UC02 - Reservar Vaga: 05 03 Implementacao Minima

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Implementacao minima**

## TDD GREEN - mapeamento
Teste: `reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.`

Producao: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

Aceite: RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
