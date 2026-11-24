# UC07 - Definir Tarifa Vigente: 01 03 Issue Principal Epic

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Issue principal pronta para GitHub**

## Issue principal - UC07
Como Administrador do Estabelecimento, quero definir tarifa vigente.

### Escopo
Validar, salvar versao e buscar ultima tarifa vigente ate o instante do ClockPort.

### Aceite
- Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.
- Cobrir: 400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
