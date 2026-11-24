# UC10 - Consultar Indicadores de Ocupacao: 01 10 Roteiro Operacional Github

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Roteiro operacional GitHub**

1. Confirmar branch e `git status --short`; sincronizar antes de iniciar.
2. Abrir a issue `UC10` (numero ainda aguardando GH CLI).
3. Criar branch `feature/uc10-slug`; concluir uma SUB completa.
4. Executar `corepack pnpm test`, `corepack pnpm build` e ESLint dirigido.
5. Criar PR, Revisao cruzada e Integracao somente com aprovacao/CI reais.

Endpoint: `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`. Nao executar script remoto sem autenticacao/autorizacao.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
