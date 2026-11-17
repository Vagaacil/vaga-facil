# UC05 - Concluir Saida: 01 10 Roteiro Operacional Github

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Roteiro operacional GitHub**

1. Confirmar branch e `git status --short`; sincronizar antes de iniciar.
2. Abrir a issue `UC05` (numero ainda aguardando GH CLI).
3. Criar branch `feature/uc05-slug`; concluir uma SUB completa.
4. Executar `corepack pnpm test`, `corepack pnpm build` e ESLint dirigido.
5. Criar PR, Revisao cruzada e Integracao somente com aprovacao/CI reais.

Endpoint: `POST /permanencias/:registroId/checkout`. Nao executar script remoto sem autenticacao/autorizacao.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
