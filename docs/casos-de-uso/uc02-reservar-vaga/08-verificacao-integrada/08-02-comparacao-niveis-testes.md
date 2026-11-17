# UC02 - Comparacao dos niveis de teste

**Caso:** UC02 - Reservar Vaga
**Ator:** Motorista
**Rotas:** `POST /reservas`

| Level | Real components | Doubles | Evidence and limit |
|---|---|---|---|
| A - unit Service | Orders/Parking Operations Service | Repository/dependencies configured by unit specs | Application rules; no HTTP/module proof. |
| B - HTTP boundary | Controller, DTO, ValidationPipe, Supertest | OrdersService/ParkingOperationsService `vi.fn()` | Routing, status, validation, delegation; no real service/repository. |
| C - integrated | AppModule, Controller, Service, DTO, pipe, InMemory adapters | None in the exercised flow | Real in-memory flow/DI; no SQL, ACID or durability proof. |

**The Material 07 HTTP test with a mocked Service does not replace the integrated test with the real Service and Repository.**

Relevant files: A [src/modules/orders/services/reservation-workflows.service.spec.ts](../../../../src/modules/orders/services/reservation-workflows.service.spec.ts); B [test/http-boundary.e2e-spec.ts](../../../../test/http-boundary.e2e-spec.ts); C [test/app.e2e-spec.ts](../../../../test/app.e2e-spec.ts). Integrated scenario: Reservation of a compatible spot; DTO requires IDs while hold expiry and availability remain application rules.

The integrated flow does not verify SQL, durability, constraints or cross-process transactions.
