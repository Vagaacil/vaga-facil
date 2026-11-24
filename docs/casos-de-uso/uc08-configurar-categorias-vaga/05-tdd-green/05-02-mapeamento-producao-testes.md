# UC08 - Configurar Categorias de Vaga: 05 02 Mapeamento Producao Testes

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Mapa producao/teste**

## TDD GREEN - mapeamento
Teste: `reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.`

Producao: src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

Aceite: RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
