# UC04 - Registrar Entrada: 04 08 Revisao Acompanhamento

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Acompanhamento**

## TDD RED - Registrar Entrada
Teste de referencia: `parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST /patios/:patioId/permanencias`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 400 Placa; 404 Patio; 409 lotado/Placa presente; 503 infraestrutura.

Branch `test/uc04-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
