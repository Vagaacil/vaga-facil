# UC01 - Cadastrar Conta e Veiculo: 01 11 Checklist Validacao

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Cadastrar Conta e Veiculo definidos.
- [ ] Regra: Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.
- [ ] Erros: 400 payload invalido; 404 Motorista ausente; 409 duplicidade.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
