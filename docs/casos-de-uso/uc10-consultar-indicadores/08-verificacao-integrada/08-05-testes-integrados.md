# UC10 - Testes integrados e evidencia de armazenamento

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

Consolidated real-module suite: [test/app.e2e-spec.ts](../../../../test/app.e2e-spec.ts). It imports `AppModule`, uses real controllers/services/providers and Supertest; no Service or Repository mock is installed in this flow. Scenario: Global and patio-scoped read-only routes delegate to the application service.

Boundary suite with Service doubles is separately located at [test/http-boundary.e2e-spec.ts](../../../../test/http-boundary.e2e-spec.ts).

## Execution and regression comparison
```text
Baseline: corepack pnpm test - 6 files, 31 tests passed (15:01:51).
Current: corepack pnpm test - 8 files, 45 tests passed (15:17:31).
Targeted: HTTP boundary 12/12; AppModule integrated E2E 7/7;
DI diagnostic 1/1; prior Service tests 21/21.
Build: corepack pnpm build - passed.
Lint: corepack pnpm exec eslint "src/**/*.ts" "test/**/*.ts" vitest.config.ts - passed.
```

## Storage evidence boundary
HTTP responses indicate the route completed through Controller -> Service -> in-memory adapter. `InMemoryParkingOperationsRepository` stores private Maps/arrays; these collections were not directly inspected and no `findAll` contract or extra GET route was added. This is not SQL/ACID/durability evidence.
