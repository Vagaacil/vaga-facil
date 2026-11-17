# UC05 - Concluir Saida: 05 06 Revisao Green

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Revisao GREEN**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.`

Producao: src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

Aceite: RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
