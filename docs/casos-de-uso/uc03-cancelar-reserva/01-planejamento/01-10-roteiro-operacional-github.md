# UC03 - Cancelar Reserva: 01 10 Roteiro Operacional Github

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Roteiro operacional GitHub**

1. Confirmar branch e `git status --short`; sincronizar antes de iniciar.
2. Abrir a issue `UC03` (numero ainda aguardando GH CLI).
3. Criar branch `feature/uc03-slug`; concluir uma SUB completa.
4. Executar `corepack pnpm test`, `corepack pnpm build` e ESLint dirigido.
5. Criar PR, Revisao cruzada e Integracao somente com aprovacao/CI reais.

Endpoint: `POST /reservas/:reservaId/cancelar`. Nao executar script remoto sem autenticacao/autorizacao.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
