# UC08 - Preparacao conceitual para persistencia real

**Caso:** UC08 - Configurar Categorias de Vaga
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST/GET /patios/:patioId/categorias-vaga; PATCH /patios/:patioId/vagas/:vagaId/categoria`

## Current verified architecture
```text
categorias-vaga.controller.ts -> OccupancyModule Service -> repository token -> InMemory adapter
```

## Future alternative (planning only)
```text
Controller -> Service -> same repository contract/token
                         +-> InMemory adapter (local tests)
                         +-> future PostgreSQL/TypeORM adapter (alternative)
```

Preserve Controller, DTO/pipe, Service, domain entity, repository interface and token. Future infrastructure may add ORM mapping/mappers, DB configuration, migrations, constraints and database tests. Persistence Sub-Issue ID/status is not verifiable and was not started here.

## Six in-memory limitations
1. Volatility: process restart loses records.
2. Instance-local scope: processes/containers do not share state.
3. Concurrency: no database locks or cross-process isolation.
4. No real ACID transaction/rollback guarantees.
5. No database-enforced constraints or referential integrity.
6. No durable audit/backup suitable for production.

No database, ORM, Docker or migration implementation was added in this task. Existing TypeORM code was not exercised against PostgreSQL.
