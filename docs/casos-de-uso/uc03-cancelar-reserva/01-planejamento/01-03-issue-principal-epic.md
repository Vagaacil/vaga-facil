# UC03 - Cancelar Reserva: 01 03 Issue Principal Epic

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Issue principal pronta para GitHub**

## Issue principal - UC03
Como Motorista, quero cancelar reserva.

### Escopo
Localizar, validar estado/prazo, liberar Vaga e persistir cancelamento.

### Aceite
- Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.
- Cobrir: 404 Reserva inexistente; 409 estado Nao cancelavel.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
