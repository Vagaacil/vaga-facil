# UC07 - Definir Tarifa Vigente: 01 05 Matriz Rastreabilidade

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante. | src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts | parking-operations.service.spec.ts: vigencia e tarifa ausente. |
| HTTP | `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
