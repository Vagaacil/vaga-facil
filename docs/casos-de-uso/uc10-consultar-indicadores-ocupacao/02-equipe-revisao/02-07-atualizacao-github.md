# UC10 - Consultar Indicadores de Ocupacao: 02 07 Atualizacao Github

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Atualizacao GitHub apos EXECUCAO real**

## Revisao da equipe
Caso UC10: Consultar Indicadores de Ocupacao. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.`, endpoint `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`, excecoes `404 Patio inexistente; 503 leitura indisponivel.` e rastreabilidade `parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
