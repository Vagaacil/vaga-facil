# UC07 - Definir Tarifa Vigente: 01 12 Relatorio Consistencia Cobertura

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Relatorio de consistencia**

## Cobertura
Implementacao: src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

Teste rastreavel: parking-operations.service.spec.ts: vigencia e tarifa ausente.

Regras: Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.

ultima suite real: 6 arquivos, 31 testes aprovados. Build e lint dirigido aprovados. Gap: PostgreSQL Nao foi iniciado; concorrencia multi-processo Nao foi empiricamente validada.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
