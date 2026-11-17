# UC02 - Reservar Vaga: 04 08 Revisao Acompanhamento

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Acompanhamento**

## TDD RED - Reservar Vaga
Teste de referencia: `reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST /reservas`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 404 cadastros ausentes; 409 sem vaga, incompatibilidade ou Reserva ativa.

Branch `test/uc02-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
