# UC03 - Cancelar Reserva: 01 09 Distribuicao Responsabilidades

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Distribuicao de equipe segregada**

## Assignee - Reviewer

- SUB-01: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-02: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.
- SUB-03: Assignee **Ian Fernandes Borges**; Reviewer **Bruno Rocco Wolfardt**.
- SUB-04: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-05: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.

Somente os tres integrantes reais sao utilizados. Mapear logins GitHub apos confirmacao; Nao inventar usernames.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
