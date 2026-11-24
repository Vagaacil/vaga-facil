# UC08 - Configurar Categorias de Vaga: 01 11 Checklist Validacao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Configurar Categorias de Vaga definidos.
- [ ] Regra: RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.
- [ ] Erros: 400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
