# UC03 - Cancelar Reserva: 04 05 Evidencia Red

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Evidencia RED sem invencao**

## TDD RED - Cancelar Reserva
Teste de referencia: `reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST /reservas/:reservaId/cancelar`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 404 Reserva inexistente; 409 estado Nao cancelavel.

Branch `test/uc03-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
