# UC07 - Definir Tarifa Vigente: 05 01 Diagnostico Red

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Diagnostico RED**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: vigencia e tarifa ausente.`

Producao: src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

Aceite: Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
