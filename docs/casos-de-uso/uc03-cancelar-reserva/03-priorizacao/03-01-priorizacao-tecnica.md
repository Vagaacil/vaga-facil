# UC03 - Cancelar Reserva: 03 01 Priorizacao Tecnica

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Prioridade tecnica**

## Priorizacao e fluxo
Priorizar pelo risco de estado e pelas Dependencias: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.

Separar contratos, Persistencia, HTTP, testes e documentacao em SUBs coesas; executar primeiro Dependencias efetivas, Nao apenas ordem numerica. Para 3 integrantes, WIP maximo sugerido: uma unidade ativa por pessoa e uma Revisao por pessoa.

Risco/impedimento: PostgreSQL TypeORM ainda sem teste contra instancia real. Prontidao: criterios e Cenarios em `reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.`.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
