# UC05 - Concluir Saida: 01 03 Issue Principal Epic

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Issue principal pronta para GitHub**

## Issue principal - UC05
Como Motorista, quero concluir Saida.

### Escopo
Calcular valor na Ocupacao, cobrar via PaymentsService e fechar Registro/liberar Vaga em transacao apos aprovacao.

### Aceite
- RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.
- Cobrir: 404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
