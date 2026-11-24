# UC07 - Definir Tarifa Vigente: 06 05 Revisao Tecnica Individual

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Revisao individual**

## Refactor e Revisao
Caso: Definir Tarifa Vigente.

- Regras preservadas: Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.
- Erros: 400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.
- Arquivos: src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts
- Testes: parking-operations.service.spec.ts: vigencia e tarifa ausente.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
