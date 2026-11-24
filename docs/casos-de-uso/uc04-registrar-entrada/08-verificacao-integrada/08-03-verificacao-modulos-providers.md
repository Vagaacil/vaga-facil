# UC04 - Modulos e providers

**Caso:** UC04 - Registrar Entrada
**Ator:** Motorista via Ponto de Acesso
**Rotas:** `POST /patios/:patioId/permanencias`

`AppModule` imports OrdersModule, PaymentsModule, and OccupancyModule. OrdersModule binds `ORDERS_REPOSITORY` to `InMemoryOrdersRepository` unless `DB_ENABLED=true`. OccupancyModule binds `PARKING_OPERATIONS_REPOSITORY` to `InMemoryParkingOperationsRepository` in memory mode and provides `CLOCK_PORT`. The integrated suite imports AppModule. DI chain: Controller -> real Service -> runtime token -> provider -> in-memory adapter.

Controller `src/modules/occupancy/controllers/patios.controller.ts`; Service `ParkingOperationsService.registrarEntrada`; module `OccupancyModule`. Interface types are not runtime DI tokens; the configured token resolves the concrete in-memory implementation when DB mode is off.

`corepack pnpm build` passed. Live startup mapped modules and routes. Isolated diagnostic test passed 1/1 and asserts missing `ORDERS_REPOSITORY`; the production module was not modified to induce failure.
