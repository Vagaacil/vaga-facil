# UC10 - Diagnostico de falhas de integracao

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

Categories: DI/module (provider/token/import), HTTP boundary (DTO/pipe/route/status), and between-layer behavior (service/repository contract).

`test/dependency-injection-diagnostic.e2e-spec.ts` registers real `OrdersService`/`OrdersController`, supplies unrelated dependencies, and omits `ORDERS_REPOSITORY`. The isolated Vitest test passed 1/1 and asserts Nest compilation rejects with a message containing that token. Full exception text was not captured and is not invented. Production `OrdersModule` remains intact and binds the token to `InMemoryOrdersRepository`.

Related application rule tests: [src/modules/occupancy/services/parking-operations.service.spec.ts](../../../../src/modules/occupancy/services/parking-operations.service.spec.ts). No production module was broken to reproduce the failure.
