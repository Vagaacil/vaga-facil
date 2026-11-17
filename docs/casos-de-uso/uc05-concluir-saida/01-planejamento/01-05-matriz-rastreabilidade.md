# UC05 - Concluir Saida: 01 05 Matriz Rastreabilidade

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo. | src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts | parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts. |
| HTTP | `POST /permanencias/:registroId/checkout` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
