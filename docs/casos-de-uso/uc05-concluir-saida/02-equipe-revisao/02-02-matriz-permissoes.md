# UC05 - Concluir Saida: 02 02 Matriz Permissoes

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Matriz de permissoes**

## Revisao da equipe
Caso UC05: Concluir Saida. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.`, endpoint `POST /permanencias/:registroId/checkout`, excecoes `404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.` e rastreabilidade `parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
