# UC09 - Tratar Impedimento de Saida: 06 04 Evidencias Validacao

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Evidencia real**

## Refactor e Revisao
Caso: Tratar Impedimento de Saida.

- Regras preservadas: Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.
- Erros: 400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.
- Arquivos: src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts
- Testes: parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.

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
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
