# UC07 - Modulos e providers

**Caso:** UC07 - Definir Tarifa Vigente
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios/:patioId/tarifas; GET /patios/:patioId/tarifa-vigente`

`AppModule` imports OrdersModule, PaymentsModule, and OccupancyModule. OrdersModule binds `ORDERS_REPOSITORY` to `InMemoryOrdersRepository` unless `DB_ENABLED=true`. OccupancyModule binds `PARKING_OPERATIONS_REPOSITORY` to `InMemoryParkingOperationsRepository` in memory mode and provides `CLOCK_PORT`. The integrated suite imports AppModule. DI chain: Controller -> real Service -> runtime token -> provider -> in-memory adapter.

Controller `src/modules/occupancy/controllers/tarifas.controller.ts`; Service `ParkingOperationsService.definirTarifa; tarifaVigente`; module `OccupancyModule`. Interface types are not runtime DI tokens; the configured token resolves the concrete in-memory implementation when DB mode is off.

`corepack pnpm build` passed. Live startup mapped modules and routes. Isolated diagnostic test passed 1/1 and asserts missing `ORDERS_REPOSITORY`; the production module was not modified to induce failure.
