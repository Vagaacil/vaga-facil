# UC05 - Concluir Saida: 01 11 Checklist Validacao

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Checklist executavel**

- [ ] Ator, payload e pre-condicoes de Concluir Saida definidos.
- [ ] Regra: RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.
- [ ] Erros: 404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.
- [ ] Testes Vitest cobrem sucesso/falha e Nao mutacao indevida.
- [ ] `corepack pnpm build`, testes e ESLint dirigidos aprovados.
- [ ] TypeORM/PG reportado como Nao verificado em runtime.
- [ ] Assignee - Reviewer; URLs reais ou placeholder.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
