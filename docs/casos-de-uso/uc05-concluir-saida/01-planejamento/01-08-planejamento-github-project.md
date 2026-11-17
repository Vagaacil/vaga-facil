# UC05 - Concluir Saida: 01 08 Planejamento Github Project

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Project com exatamente cinco estados**

## Fluxo do GitHub Project
A coluna Status de Trabalho contem **exatamente cinco opcoes**: `Backlog`, `Ready`, `In Progress`, `In Review`, `Done`.

Backlog = refinamento pendente; Ready = DoR-01..07; In Progress = EXECUCAO; In Review = Revisao cruzada; Done = aceite/testes. O script configura o campo, cria o Project e adiciona issues.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
