# UC08 - Configurar Categorias de Vaga: 04 08 Revisao Acompanhamento

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Acompanhamento**

## TDD RED - Configurar Categorias de Vaga
Teste de referencia: `reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.`

### Cenario AAA
- **Arrange:** repositorio InMemory isolado, Clock fixo, pre-condicoes validas.
- **Act:** chamar `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`/Service/Handler.
- **Assert:** resultado, status/codigo, invariantes e estado persistido.

Inclua alternativos: 400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.

Branch `test/uc08-slug`; commit `test(scope): descreve o Cenario`. Registre a falha RED real ao rodar o teste antes do codigo; Nao ha Saida RED ficticia neste material.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
