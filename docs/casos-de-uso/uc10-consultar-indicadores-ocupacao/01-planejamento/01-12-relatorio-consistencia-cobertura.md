# UC10 - Consultar Indicadores de Ocupacao: 01 12 Relatorio Consistencia Cobertura

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Relatorio de consistencia**

## Cobertura
Implementacao: src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

Teste rastreavel: parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.

Regras: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.

ultima suite real: 6 arquivos, 31 testes aprovados. Build e lint dirigido aprovados. Gap: PostgreSQL Nao foi iniciado; concorrencia multi-processo Nao foi empiricamente validada.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
