# UC10 - Consultar Indicadores de Ocupacao: 06 04 Evidencias Validacao

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Evidencia real**

## Refactor e Revisao
Caso: Consultar Indicadores de Ocupacao.

- Regras preservadas: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.
- Erros: 404 Patio inexistente; 503 leitura indisponivel.
- Arquivos: src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts
- Testes: parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.

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
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
