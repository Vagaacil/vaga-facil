# 09-05 — Repositórios TypeORM e providers

## Implementações adicionadas
- [src/modules/orders/repositories/typeorm-orders.repository.ts](../../src/modules/orders/repositories/typeorm-orders.repository.ts)
- [src/modules/occupancy/repositories/typeorm-parking-stay.repository.ts](../../src/modules/occupancy/repositories/typeorm-parking-stay.repository.ts)

## Module wiring
- [src/modules/orders/orders.module.ts](../../src/modules/orders/orders.module.ts)
- [src/modules/occupancy/occupancy.module.ts](../../src/modules/occupancy/occupancy.module.ts)

## Estratégia preservada
Quando `DB_ENABLED=true`, os módulos passam a usar repositórios TypeORM. Quando o flag não está habilitado, mantêm a abordagem em memória, preservando os testes anteriores.
