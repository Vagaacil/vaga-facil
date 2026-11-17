# UC05 - Concluir Saida: 06 07 Riscos E Pendencias

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Riscos residuais**

## Refactor e Revisao
Caso: Concluir Saida.

- Regras preservadas: RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.
- Erros: 404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.
- Arquivos: src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts
- Testes: parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
