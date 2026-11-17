# UC08 - Configurar Categorias de Vaga: 06 04 Evidencias Validacao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Evidencia real**

## Refactor e Revisao
Caso: Configurar Categorias de Vaga.

- Regras preservadas: RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.
- Erros: 400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.
- Arquivos: src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts
- Testes: reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.

```text
$ corepack pnpm test
 RUN  v5.0.5 C:/Users/utfpr/Downloads/vaga-facil
 Test Files  6 passed (6)
      Tests  31 passed (31)
   Start at  14:49:29
   Duration  2.10s (import 68%, tests 17%, transform 15%)
```

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
