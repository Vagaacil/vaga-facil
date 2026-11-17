# UC10 - Modulos e providers

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

`AppModule` imports OrdersModule, PaymentsModule, and OccupancyModule. OrdersModule binds `ORDERS_REPOSITORY` to `InMemoryOrdersRepository` unless `DB_ENABLED=true`. OccupancyModule binds `PARKING_OPERATIONS_REPOSITORY` to `InMemoryParkingOperationsRepository` in memory mode and provides `CLOCK_PORT`. The integrated suite imports AppModule. DI chain: Controller -> real Service -> runtime token -> provider -> in-memory adapter.

Controller `src/modules/occupancy/controllers/indicadores.controller.ts`; Service `ParkingOperationsService.indicadores`; module `OccupancyModule`. Interface types are not runtime DI tokens; the configured token resolves the concrete in-memory implementation when DB mode is off.

`corepack pnpm build` passed. Live startup mapped modules and routes. Isolated diagnostic test passed 1/1 and asserts missing `ORDERS_REPOSITORY`; the production module was not modified to induce failure.
