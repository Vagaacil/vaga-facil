# UC05 - Concluir Saida: 06 04 Evidencias Validacao

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Evidencia real**

## Refactor e Revisao
Caso: Concluir Saida.

- Regras preservadas: RN02 tarifa no instante da Saida; RN05 pagamento antes de fechar/liberar; RN07 intervalo Nao negativo.
- Erros: 404 permanencia; 409 tarifa/pagamento; 503 gateway/banco.
- Arquivos: src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts
- Testes: parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.

```text
$ corepack pnpm test
 RUN  v5.0.5 C:/Users/utfpr/Downloads/vaga-facil
 Test Files  6 passed (6)
      Tests  31 passed (31)
   Start at  14:49:29
   Duration  2.10s (import 68%, tests 17%, transform 15%)
```

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
