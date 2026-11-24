# UC03 - Cancelar Reserva: 01 01 Analise Tecnica

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Motorista. Objetivo: Cancelar Reserva. Fluxo: Localizar, validar estado/prazo, liberar Vaga e persistir cancelamento.

## Regras e alternativos
Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.

Erros: 404 Reserva inexistente; 409 estado Nao cancelavel.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
