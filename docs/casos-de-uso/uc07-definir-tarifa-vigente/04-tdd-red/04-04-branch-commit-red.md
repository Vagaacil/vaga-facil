# UC07 - Definir Tarifa Vigente: 04 04 Branch Commit Red

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Branch/commit RED**

## TDD RED - Definir Tarifa Vigente
Teste de referencia: `parking-operations.service.spec.ts: vigencia e tarifa ausente.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.

Branch `test/uc07-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
