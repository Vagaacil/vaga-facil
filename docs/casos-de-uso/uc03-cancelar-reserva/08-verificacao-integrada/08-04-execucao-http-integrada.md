# UC03 - Execucao HTTP integrada

**Caso:** UC03 - Cancelar Reserva
**Ator:** Motorista
**Rotas:** `POST /reservas/:reservaId/cancelar`

Environment: `DB_ENABLED=false`, port 3118, `node dist/main.js`, PowerShell/.NET HttpClient plus Supertest; real `AppModule`, Controller, Service and memory repositories.

API local: `DB_ENABLED=false`, `PORT=3118`, `node dist/main.js`; startup at 15:10:15 mapped modules/routes.

Valid: `POST http://127.0.0.1:3118/patios`, JSON `{"nome":"Evidence Patio"}`. Observed HTTP 201 and `{"patioId":"4ada7138-f6d8-4635-b1a3-756ecf1ff87a","nome":"Evidence Patio"}`.

Invalid: `POST http://127.0.0.1:3118/motoristas`, JSON `{"nome":" ","email":"bad"}`. Observed HTTP 400 and `{"message":["nome must match /\\S/ regular expression","email must be an email"],"error":"Bad Request","statusCode":400}`.

Full live flow completed: driver/vehicle, patio, two spots, tariff, category/assignment, reservation/cancellation, entry, checkout `APPROVED`, impediment `MANTER_RETIDO` then release (`closed`), patio indicators `totalVagas=2`. A 4-letter plate `HTTP-1234` was rejected with `PLACA_INVALIDA`; retry with `HTT1234` succeeded. The private repository collection was not inspected.

UC-specific evidence: Live `POST /reservas/{reservaId}/cancelar` completed and returned state `cancelled` for reservation `6b1b3b4f-55c4-4b58-b65c-6d79ef8bf85c`; Supertest asserts HTTP 201.

HTTP response evidence is not direct inspection of internal Maps. No query method/endpoint was added for observation. No PostgreSQL test is claimed.
