# UC09 - Tratar Impedimento de Saida: 04 07 Revisao Red

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Revisao RED**

## TDD RED - Tratar Impedimento de Saida
Teste de referencia: `parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST /permanencias/:registroId/resolver-impedimento`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.

Branch `test/uc09-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
