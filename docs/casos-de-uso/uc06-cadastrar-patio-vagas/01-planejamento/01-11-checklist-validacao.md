# UC06 - Cadastrar Patio e Vagas: 01 11 Checklist Validacao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Cadastrar Patio e Vagas definidos.
- [ ] Regra: Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.
- [ ] Erros: 400 payload; 404 Patio; 409 codigo duplicado; 503 Persistencia.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
