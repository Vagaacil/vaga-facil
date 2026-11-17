# UC10 - Consultar Indicadores de Ocupacao: 01 01 Analise Tecnica

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Administrador da Rede. Objetivo: Consultar Indicadores de Ocupacao. Fluxo: Consultar somente leitura, agrupar escopo, retornar zero em conjunto vazio e calcular medias.

## Regras e alternativos
Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.

Erros: 404 Patio inexistente; 503 leitura indisponivel.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
