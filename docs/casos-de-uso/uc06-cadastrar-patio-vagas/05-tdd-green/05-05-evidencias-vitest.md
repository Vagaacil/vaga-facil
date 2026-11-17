# UC06 - Cadastrar Patio e Vagas: 05 05 Evidencias Vitest

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Saida Vitest real**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.`

Producao: src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

Aceite: Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.

```text
$ corepack pnpm test
 RUN  v5.0.5 C:/Users/utfpr/Downloads/vaga-facil
 Test Files  6 passed (6)
      Tests  31 passed (31)
   Start at  14:49:29
   Duration  2.10s (import 68%, tests 17%, transform 15%)
```

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
