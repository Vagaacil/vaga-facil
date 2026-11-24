# UC07 - Definir Tarifa Vigente: 01 01 Analise Tecnica

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Administrador do Estabelecimento. Objetivo: Definir Tarifa Vigente. Fluxo: Validar, salvar versao e buscar ultima tarifa vigente ate o instante do ClockPort.

## Regras e alternativos
Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.

Erros: 400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
