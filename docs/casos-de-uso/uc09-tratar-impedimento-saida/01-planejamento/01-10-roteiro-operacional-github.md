# UC09 - Tratar Impedimento de Saida: 01 10 Roteiro Operacional Github

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Roteiro operacional GitHub**

1. Confirmar branch e `git status --short`; sincronizar antes de iniciar.
2. Abrir a issue `UC09` (numero ainda aguardando GH CLI).
3. Criar branch `feature/uc09-slug`; concluir uma SUB completa.
4. Executar `corepack pnpm test`, `corepack pnpm build` e ESLint dirigido.
5. Criar PR, Revisao cruzada e Integracao somente com aprovacao/CI reais.

Endpoint: `POST /permanencias/:registroId/resolver-impedimento`. Nao executar script remoto sem autenticacao/autorizacao.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
