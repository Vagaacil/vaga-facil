# UC05 - Concluir Saida: 01 02 Decomposicao Unidades Trabalho

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Concluir Saida (POST /permanencias/:registroId/checkout).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Concluir Saida (POST /permanencias/:registroId/checkout).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Concluir Saida (POST /permanencias/:registroId/checkout).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Concluir Saida (POST /permanencias/:registroId/checkout).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Concluir Saida (POST /permanencias/:registroId/checkout).

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
