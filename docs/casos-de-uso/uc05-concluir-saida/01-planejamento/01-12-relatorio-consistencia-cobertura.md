# UC05 - Concluir Saida: 01 12 Relatorio Consistencia Cobertura

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Relatorio de consistencia**

## Cobertura
Implementacao: src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

Teste rastreavel: parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.

Regras: RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.

ultima suite real: 6 arquivos, 31 testes aprovados. Build e lint dirigido aprovados. Gap: PostgreSQL Nao foi iniciado; concorrencia multi-processo Nao foi empiricamente validada.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
