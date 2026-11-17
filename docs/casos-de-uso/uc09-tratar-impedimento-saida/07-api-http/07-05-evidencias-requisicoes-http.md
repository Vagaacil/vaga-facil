# UC09 - Evidencias HTTP

**Caso:** UC09 - Tratar Impedimento de Saida
**Ator:** Operador de Portaria
**Rotas:** `POST /permanencias/:registroId/resolver-impedimento`

## Live environment and responses
API local: `DB_ENABLED=false`, `PORT=3118`, `node dist/main.js`; startup at 15:10:15 mapped modules/routes.

Valid: `POST http://127.0.0.1:3118/patios`, JSON `{"nome":"Evidence Patio"}`. Observed HTTP 201 and `{"patioId":"4ada7138-f6d8-4635-b1a3-756ecf1ff87a","nome":"Evidence Patio"}`.

Invalid: `POST http://127.0.0.1:3118/motoristas`, JSON `{"nome":" ","email":"bad"}`. Observed HTTP 400 and `{"message":["nome must match /\\S/ regular expression","email must be an email"],"error":"Bad Request","statusCode":400}`.

Full live flow completed: driver/vehicle, patio, two spots, tariff, category/assignment, reservation/cancellation, entry, checkout `APPROVED`, impediment `MANTER_RETIDO` then release (`closed`), patio indicators `totalVagas=2`. A 4-letter plate `HTTP-1234` was rejected with `PLACA_INVALIDA`; retry with `HTT1234` succeeded. The private repository collection was not inspected.

## Evidence for this use case
Live `POST /permanencias/{registroId}/resolver-impedimento` completed for `MANTER_RETIDO`, then `LIBERAR_MANUALMENTE`; final status was `closed`. Supertest asserts HTTP 201 and resulting states.

`Invoke-RestMethod` completed the valid flow; Supertest asserts endpoint statuses. A returned entity/ID proves an HTTP response, not direct inspection of private repository state. Domain errors remain separate from DTO errors. No remote evidence was fabricated.
