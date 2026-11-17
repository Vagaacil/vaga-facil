# UC04 - Registrar Entrada: 01 10 Roteiro Operacional Github

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Roteiro operacional GitHub**

1. Confirmar branch e `git status --short`; sincronizar antes de iniciar.
2. Abrir a issue `UC04` (numero ainda aguardando GH CLI).
3. Criar branch `feature/uc04-slug`; concluir uma SUB completa.
4. Executar `corepack pnpm test`, `corepack pnpm build` e ESLint dirigido.
5. Criar PR, Revisao cruzada e Integracao somente com aprovacao/CI reais.

Endpoint: `POST /patios/:patioId/permanencias`. Nao executar script remoto sem autenticacao/autorizacao.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
