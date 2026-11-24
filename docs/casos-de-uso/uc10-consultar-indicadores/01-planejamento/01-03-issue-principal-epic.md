# UC10 - Consultar Indicadores de Ocupacao: 01 03 Issue Principal Epic

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Issue principal pronta para GitHub**

## Issue principal - UC10
Como Administrador da Rede, quero consultar indicadores de Ocupacao.

### Escopo
Consultar somente leitura, agrupar escopo, retornar zero em conjunto vazio e calcular medias.

### Aceite
- Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.
- Cobrir: 404 Patio inexistente; 503 leitura indisponivel.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
