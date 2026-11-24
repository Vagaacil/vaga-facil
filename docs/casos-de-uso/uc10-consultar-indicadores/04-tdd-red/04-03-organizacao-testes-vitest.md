# UC10 - Consultar Indicadores de Ocupacao: 04 03 Organizacao Testes Vitest

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Organizacao Vitest**

## TDD RED - Consultar Indicadores de Ocupacao
Teste de referencia: `parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 404 Patio inexistente; 503 leitura indisponivel.

Branch `test/uc10-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
