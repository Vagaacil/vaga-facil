# UC10 - Consultar Indicadores de Ocupacao: 03 06 Revisao Prontidao

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Revisao de Prontidao**

## Priorizacao e fluxo
Priorizar pelo risco de estado e pelas Dependencias: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.

Separar contratos, Persistencia, HTTP, testes e documentacao em SUBs coesas; executar primeiro Dependencias efetivas, Nao apenas ordem numerica. Para 3 integrantes, WIP maximo sugerido: uma unidade ativa por pessoa e uma Revisao por pessoa.

Risco/impedimento: PostgreSQL TypeORM ainda sem teste contra instancia real. Prontidao: criterios e Cenarios em `parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.`.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
