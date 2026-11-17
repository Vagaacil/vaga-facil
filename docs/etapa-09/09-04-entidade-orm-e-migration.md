# 09-04 — Entidade ORM e migration

## Entidades ORM implementadas
- [src/modules/orders/entities/reservation.orm-entity.ts](../../src/modules/orders/entities/reservation.orm-entity.ts)
- [src/modules/occupancy/entities/parking-stay.orm-entity.ts](../../src/modules/occupancy/entities/parking-stay.orm-entity.ts)

## Mapper
Para preservar os contratos de domínio, o projeto passou a converter entre entidade de domínio e entidade ORM:
- [src/modules/orders/mappers/reservation.mapper.ts](../../src/modules/orders/mappers/reservation.mapper.ts)
- [src/modules/occupancy/mappers/parking-stay.mapper.ts](../../src/modules/occupancy/mappers/parking-stay.mapper.ts)

## Migration criada
Arquivo criado:
- [src/database/migrations/1710000000000-create-reservations-and-parking-stays.ts](../../src/database/migrations/1710000000000-create-reservations-and-parking-stays.ts)

Ela cria as tabelas `reservations` e `parking_stays` com as colunas principais do domínio. A migration foi compilada, mas não aplicada: a conexão com o Docker Engine/PostgreSQL não estava disponível durante esta execução.
