# UC02 - Reservar Vaga: 01 08 Planejamento Github Project

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Project com exatamente cinco estados**

## Fluxo do GitHub Project
A coluna Status de Trabalho contem **exatamente cinco opcoes**: `Backlog`, `Ready`, `In Progress`, `In Review`, `Done`.

Backlog = refinamento pendente; Ready = DoR-01..07; In Progress = EXECUCAO; In Review = Revisao cruzada; Done = aceite/testes. O script configura o campo, cria o Project e adiciona issues.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
