# UC08 - Comparacao dos niveis de teste

**Caso:** UC08 - Configurar Categorias de Vaga
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST/GET /patios/:patioId/categorias-vaga; PATCH /patios/:patioId/vagas/:vagaId/categoria`

| Level | Real components | Doubles | Evidence and limit |
|---|---|---|---|
| A - unit Service | Orders/Parking Operations Service | Repository/dependencies configured by unit specs | Application rules; no HTTP/module proof. |
| B - HTTP boundary | Controller, DTO, ValidationPipe, Supertest | OrdersService/ParkingOperationsService `vi.fn()` | Routing, status, validation, delegation; no real service/repository. |
| C - integrated | AppModule, Controller, Service, DTO, pipe, InMemory adapters | None in the exercised flow | Real in-memory flow/DI; no SQL, ACID or durability proof. |

**The Material 07 HTTP test with a mocked Service does not replace the integrated test with the real Service and Repository.**

Relevant files: A [src/modules/occupancy/services/parking-operations.service.spec.ts](../../../../src/modules/occupancy/services/parking-operations.service.spec.ts); B [test/http-boundary.e2e-spec.ts](../../../../test/http-boundary.e2e-spec.ts); C [test/app.e2e-spec.ts](../../../../test/app.e2e-spec.ts). Integrated scenario: Category DTO validates array/string shape; compatibility and reassignment rules remain in the application.

The integrated flow does not verify SQL, durability, constraints or cross-process transactions.
