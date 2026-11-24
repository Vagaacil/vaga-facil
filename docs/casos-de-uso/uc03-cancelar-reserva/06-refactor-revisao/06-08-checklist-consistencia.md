# UC03 - Cancelar Reserva: 06 08 Checklist Consistencia

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Checklist final**

## Refactor e Revisao
Caso: Cancelar Reserva.

- Regras preservadas: Cancelar somente Reserva ativa; liberar retencao identificada e preservar estados terminais.
- Erros: 404 Reserva inexistente; 409 estado Nao cancelavel.
- Arquivos: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts
- Testes: reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
