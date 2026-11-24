# UC10 - Consultar Indicadores de Ocupacao: 01 05 Matriz Rastreabilidade

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio. | src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts | parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores. |
| HTTP | `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
