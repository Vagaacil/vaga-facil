# UC06 - Validacao e modulo

**Caso:** UC06 - Cadastrar Patio e Vagas
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios; POST/GET /patios/:patioId/vagas`

## ValidationPipe
`src/main.ts` installs `ValidationPipe({ whitelist: true, transform: true })`. `whitelist` removes undecorated properties; `transform` creates DTO instances. No `@Type` numeric conversions were added, so numeric strings stay invalid. Dependencies `class-validator` and `class-transformer` are installed. Tests install the same pipe explicitly.

## Modules and providers
`AppModule` imports OrdersModule, PaymentsModule, and OccupancyModule. OrdersModule binds `ORDERS_REPOSITORY` to `InMemoryOrdersRepository` unless `DB_ENABLED=true`. OccupancyModule binds `PARKING_OPERATIONS_REPOSITORY` to `InMemoryParkingOperationsRepository` in memory mode and provides `CLOCK_PORT`. The integrated suite imports AppModule. DI chain: Controller -> real Service -> runtime token -> provider -> in-memory adapter.

Controller `src/modules/occupancy/controllers/patios.controller.ts`; Service `ParkingOperationsService.criarPatio; criarVaga; listarVagas`; module `OccupancyModule`. The interface remains a TypeScript contract and the runtime injection token remains its established string/symbol/class token. No competing repository contract was created.

## Real startup evidence
Executed with `DB_ENABLED=false`, `PORT=3118`, `node dist/main.js`.

```text
[NestFactory] Starting Nest application...
[InstanceLoader] AppModule dependencies initialized
[InstanceLoader] OccupancyModule dependencies initialized
[InstanceLoader] OrdersModule dependencies initialized
[RouterExplorer] Mapped {/motoristas, POST} route
[RouterExplorer] Mapped {/reservas, POST} route
[RouterExplorer] Mapped {/patios/:patioId/permanencias, POST} route
[RouterExplorer] Mapped {/permanencias/:registroId/checkout, POST} route
[RouterExplorer] Mapped {/indicadores/ocupacao, GET} route
[NestApplication] Nest application successfully started
Application is running on: http://localhost:3118
```

Application initialized and routes were mapped. PostgreSQL was not started; no real database integration is claimed.
