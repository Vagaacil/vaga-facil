# UC05 - Concluir Saida: 01 01 Analise Tecnica

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Motorista. Objetivo: Concluir Saida. Fluxo: Calcular valor na Ocupacao, cobrar via PaymentsService e fechar Registro/liberar Vaga em transacao apos aprovacao.

## Regras e alternativos
RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.

Erros: 404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
