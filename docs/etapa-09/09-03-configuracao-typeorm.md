# 09-03 — Configuração do TypeORM

## Configuração aplicada
A infraestrutura foi configurada com:
- `TypeOrmModule.forRootAsync(...)` em `AppModule`
- `typeorm.config.ts` com `entities`, `migrations`, `migrationsRun` e `synchronize: false`
- `DataSource` dedicado em `src/config/data-source.ts`

## Regras preservadas
- `synchronize` mantido em `false`.
- `autoLoadEntities` foi substituído por registro explícito das entidades ORM.
- A aplicação continua funcionando em memória quando `DB_ENABLED` não está habilitado.

## Arquivos principais
- [src/app.module.ts](../../src/app.module.ts)
- [src/config/typeorm.config.ts](../../src/config/typeorm.config.ts)
- [src/config/data-source.ts](../../src/config/data-source.ts)
