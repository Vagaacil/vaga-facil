# UC10 - Consultar Indicadores de Ocupacao: 01 11 Checklist Validacao

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Consultar Indicadores de Ocupacao definidos.
- [ ] Regra: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.
- [ ] Erros: 404 Patio inexistente; 503 leitura indisponivel.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
