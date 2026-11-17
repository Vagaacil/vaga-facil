# UC08 - Configurar Categorias de Vaga: 06 05 Revisao Tecnica Individual

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Revisao individual**

## Refactor e Revisao
Caso: Configurar Categorias de Vaga.

- Regras preservadas: RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.
- Erros: 400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.
- Arquivos: src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts
- Testes: reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
