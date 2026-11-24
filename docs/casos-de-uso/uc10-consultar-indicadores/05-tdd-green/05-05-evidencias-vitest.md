# UC10 - Consultar Indicadores de Ocupacao: 05 05 Evidencias Vitest

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Saida Vitest real**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.`

Producao: src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

Aceite: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.

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
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
