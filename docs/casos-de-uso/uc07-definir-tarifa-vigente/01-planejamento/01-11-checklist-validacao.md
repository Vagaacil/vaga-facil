# UC07 - Definir Tarifa Vigente: 01 11 Checklist Validacao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Definir Tarifa Vigente definidos.
- [ ] Regra: Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.
- [ ] Erros: 400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
