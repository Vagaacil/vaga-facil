# UC07 - Definir Tarifa Vigente: 06 04 Evidencias Validacao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Evidencia real**

## Refactor e Revisao
Caso: Definir Tarifa Vigente.

- Regras preservadas: Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.
- Erros: 400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.
- Arquivos: src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts
- Testes: parking-operations.service.spec.ts: vigencia e tarifa ausente.

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
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
