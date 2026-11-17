# UC05 - Concluir Saida: 01 06 Matriz Dependencias

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Dependencias explicitas**

## Dependencias refinadas
UC06 (Patio/Vaga) - pre-requisito de UC05; UC01 (Motorista/Veiculo) e UC08 (Categoria) antecedem UC02; UC07 antecede UC05.

No caso: RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.

**Paralelismo:** testes e documentacao podem evoluir junto ao dominio apos estabilizacao dos contratos; Nao dividir artificialmente RED/GREEN.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
