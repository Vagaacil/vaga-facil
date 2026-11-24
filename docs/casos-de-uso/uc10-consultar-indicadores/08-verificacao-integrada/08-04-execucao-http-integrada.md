# UC10 - Execucao HTTP integrada

**Caso:** UC10 - Consultar Indicadores de Ocupacao
**Ator:** Administrador da Rede
**Rotas:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`

Environment: `DB_ENABLED=false`, port 3118, `node dist/main.js`, PowerShell/.NET HttpClient plus Supertest; real `AppModule`, Controller, Service and memory repositories.

API local: `DB_ENABLED=false`, `PORT=3118`, `node dist/main.js`; startup at 15:10:15 mapped modules/routes.

Valid: `POST http://127.0.0.1:3118/patios`, JSON `{"nome":"Evidence Patio"}`. Observed HTTP 201 and `{"patioId":"4ada7138-f6d8-4635-b1a3-756ecf1ff87a","nome":"Evidence Patio"}`.

Invalid: `POST http://127.0.0.1:3118/motoristas`, JSON `{"nome":" ","email":"bad"}`. Observed HTTP 400 and `{"message":["nome must match /\\S/ regular expression","email must be an email"],"error":"Bad Request","statusCode":400}`.

Full live flow completed: driver/vehicle, patio, two spots, tariff, category/assignment, reservation/cancellation, entry, checkout `APPROVED`, impediment `MANTER_RETIDO` then release (`closed`), patio indicators `totalVagas=2`. A 4-letter plate `HTTP-1234` was rejected with `PLACA_INVALIDA`; retry with `HTT1234` succeeded. The private repository collection was not inspected.

UC-specific evidence: Live `GET /patios/7e318c85-8176-46d9-a25a-1bdf6f1ff87a/indicadores` returned `totalVagas=2`. Supertest covers this route and `GET /indicadores/ocupacao` with HTTP 200.

HTTP response evidence is not direct inspection of internal Maps. No query method/endpoint was added for observation. No PostgreSQL test is claimed.
