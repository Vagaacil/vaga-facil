# UC08 - Configurar Categorias de Vaga: 02 08 Checklist Consistencia

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Checklist de equipe**

## Revisao da equipe
Caso UC08: Configurar Categorias de Vaga. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.`, endpoint `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`, excecoes `400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.` e rastreabilidade `reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
