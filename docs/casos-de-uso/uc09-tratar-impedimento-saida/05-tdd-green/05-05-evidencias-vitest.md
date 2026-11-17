# UC09 - Tratar Impedimento de Saida: 05 05 Evidencias Vitest

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Saida Vitest real**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.`

Producao: src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

Aceite: Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.

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
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
