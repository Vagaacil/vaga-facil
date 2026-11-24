# UC03 - Cancelar Reserva: 01 11 Checklist Validacao

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Cancelar Reserva definidos.
- [ ] Regra: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.
- [ ] Erros: 404 Reserva inexistente; 409 estado Nao cancelavel.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
