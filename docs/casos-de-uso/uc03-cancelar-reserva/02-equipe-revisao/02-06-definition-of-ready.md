# UC03 - Cancelar Reserva: 02 06 Definition Of Ready

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**DoR-01 a DoR-07**

## DoR-01 a DoR-07
- DoR-01 objetivo/ator; DoR-02 fluxo principal e alternativos; DoR-03 regras; DoR-04 Dependencias; DoR-05 aceites observaveis; DoR-06 dados/limites; DoR-07 Assignee e Reviewer distintos.

## Revisao da equipe
Caso UC03: Cancelar Reserva. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.`, endpoint `POST /reservas/:reservaId/cancelar`, excecoes `404 Reserva inexistente; 409 estado Nao cancelavel.` e rastreabilidade `reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
