# UC08 - Configurar Categorias de Vaga: 01 10 Roteiro Operacional Github

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Roteiro operacional GitHub**

1. Confirmar branch e `git status --short`; sincronizar antes de iniciar.
2. Abrir a issue `UC08` (numero ainda aguardando GH CLI).
3. Criar branch `feature/uc08-slug`; concluir uma SUB completa.
4. Executar `corepack pnpm test`, `corepack pnpm build` e ESLint dirigido.
5. Criar PR, Revisao cruzada e Integracao somente com aprovacao/CI reais.

Endpoint: `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`. Nao executar script remoto sem autenticacao/autorizacao.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
