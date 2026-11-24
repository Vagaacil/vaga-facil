# UC04 - Registrar Entrada: 01 11 Checklist Validacao

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Registrar Entrada definidos.
- [ ] Regra: RN01, RN07, RN08, RN09 e INV-S1; ClockPort unico; entrada reservada pelo titular.
- [ ] Erros: 400 Placa; 404 Patio; 409 lotado/Placa presente; 503 infraestrutura.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
