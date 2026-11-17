# UC02 - Reservar Vaga: 01 11 Checklist Validacao

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Reservar Vaga definidos.
- [ ] Regra: RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros.
- [ ] Erros: 404 cadastros ausentes; 409 sem vaga, incompatibilidade ou Reserva ativa.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
