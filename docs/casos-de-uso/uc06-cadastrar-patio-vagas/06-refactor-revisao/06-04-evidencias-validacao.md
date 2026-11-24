# UC06 - Cadastrar Patio e Vagas: 06 04 Evidencias Validacao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Evidencia real**

## Refactor e Revisao
Caso: Cadastrar Patio e Vagas.

- Regras preservadas: Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.
- Erros: 400 payload; 404 Patio; 409 codigo duplicado; 503 Persistencia.
- Arquivos: src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts
- Testes: parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.

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
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
