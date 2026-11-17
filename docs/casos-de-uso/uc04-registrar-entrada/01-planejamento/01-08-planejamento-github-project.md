# UC04 - Registrar Entrada: 01 08 Planejamento Github Project

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Project com exatamente cinco estados**

## Fluxo do GitHub Project
A coluna Status de Trabalho contem **exatamente cinco opcoes**: `Backlog`, `Ready`, `In Progress`, `In Review`, `Done`.

Backlog = refinamento pendente; Ready = DoR-01..07; In Progress = EXECUCAO; In Review = Revisao cruzada; Done = aceite/testes. O script configura o campo, cria o Project e adiciona issues.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
