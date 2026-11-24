# UC08 - Configurar Categorias de Vaga: 01 08 Planejamento Github Project

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Project com exatamente cinco estados**

## Fluxo do GitHub Project
A coluna Status de Trabalho contem **exatamente cinco opcoes**: `Backlog`, `Ready`, `In Progress`, `In Review`, `Done`.

Backlog = refinamento pendente; Ready = DoR-01..07; In Progress = EXECUCAO; In Review = Revisao cruzada; Done = aceite/testes. O script configura o campo, cria o Project e adiciona issues.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
