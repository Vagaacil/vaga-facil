# UC06 - Cadastrar Patio e Vagas: 02 07 Atualizacao Github

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Atualizacao GitHub apos EXECUCAO real**

## Revisao da equipe
Caso UC06: Cadastrar Patio e Vagas. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.`, endpoint `POST /patios; POST/GET /patios/:patioId/vagas`, excecoes `400 payload; 404 Patio; 409 codigo duplicado; 503 Persistencia.` e rastreabilidade `parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
