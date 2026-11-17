# UC07 - Definir Tarifa Vigente: 03 06 Revisao Prontidao

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Revisao de Prontidao**

## Priorizacao e fluxo
Priorizar pelo risco de estado e pelas Dependencias: Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.

Separar contratos, Persistencia, HTTP, testes e documentacao em SUBs coesas; executar primeiro Dependencias efetivas, Nao apenas ordem numerica. Para 3 integrantes, WIP maximo sugerido: uma unidade ativa por pessoa e uma Revisao por pessoa.

Risco/impedimento: PostgreSQL TypeORM ainda sem teste contra instancia real. Prontidao: criterios e Cenarios em `parking-operations.service.spec.ts: vigencia e tarifa ausente.`.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
