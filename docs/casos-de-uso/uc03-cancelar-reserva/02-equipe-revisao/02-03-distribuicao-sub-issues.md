# UC03 - Cancelar Reserva: 02 03 Distribuicao Sub Issues

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Distribuicao SUB-01 a SUB-05**

## Distribuicao SUB-01..SUB-05
- SUB-01: Bruno Rocco Wolfardt implementa; Felipe Sousa da Costa revisa.
- SUB-02: Felipe Sousa da Costa implementa; Ian Fernandes Borges revisa.
- SUB-03: Ian Fernandes Borges implementa; Bruno Rocco Wolfardt revisa.
- SUB-04: Bruno Rocco Wolfardt implementa; Felipe Sousa da Costa revisa.
- SUB-05: Felipe Sousa da Costa implementa; Ian Fernandes Borges revisa.

## Revisao da equipe
Caso UC03: Cancelar Reserva. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.`, endpoint `POST /reservas/:reservaId/cancelar`, excecoes `404 Reserva inexistente; 409 estado Nao cancelavel.` e rastreabilidade `reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
