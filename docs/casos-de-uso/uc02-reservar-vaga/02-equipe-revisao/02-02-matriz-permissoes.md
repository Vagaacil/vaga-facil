# UC02 - Reservar Vaga: 02 02 Matriz Permissoes

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Matriz de permissoes**

## Revisao da equipe
Caso UC02: Reservar Vaga. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros.`, endpoint `POST /reservas`, excecoes `404 cadastros ausentes; 409 sem vaga, incompatibilidade ou Reserva ativa.` e rastreabilidade `reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
