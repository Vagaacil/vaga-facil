# UC05 - Concluir Saida: 04 04 Branch Commit Red

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Branch/commit RED**

## TDD RED - Concluir Saida
Teste de referencia: `parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST /permanencias/:registroId/checkout`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.

Branch `test/uc05-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
