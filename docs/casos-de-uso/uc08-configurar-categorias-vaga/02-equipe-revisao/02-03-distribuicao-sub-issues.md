# UC08 - Configurar Categorias de Vaga: 02 03 Distribuicao Sub Issues

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Distribuicao SUB-01 a SUB-05**

## Distribuicao SUB-01..SUB-05
- SUB-01: Bruno Rocco Wolfardt implementa; Felipe Sousa da Costa revisa.
- SUB-02: Felipe Sousa da Costa implementa; Ian Fernandes Borges revisa.
- SUB-03: Ian Fernandes Borges implementa; Bruno Rocco Wolfardt revisa.
- SUB-04: Bruno Rocco Wolfardt implementa; Felipe Sousa da Costa revisa.
- SUB-05: Felipe Sousa da Costa implementa; Ian Fernandes Borges revisa.

## Revisao da equipe
Caso UC08: Configurar Categorias de Vaga. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.`, endpoint `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`, excecoes `400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.` e rastreabilidade `reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
