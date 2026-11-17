# 09-07 — Testes automatizados com PostgreSQL

## Arquivo de teste da etapa
- [test/postgres.integration.spec.ts](../../test/postgres.integration.spec.ts)

## Cobertura do teste
O arquivo implementa verificações de:
- conexão ao banco de testes;
- identidade do banco e do usuário atual;
- persistência de reserva;
- persistência de permanência.

O `DataSource` dedicado em `src/config/test-data-source.ts` exige variáveis `TEST_DB_*`, rejeita nome de banco, usuário ou senha iguais aos de desenvolvimento, valida a identidade SQL antes das migrations e mantém `synchronize: false`. Os testes usam UUIDs exclusivos e não executam `TRUNCATE`.

## Script de execução
```bash
pnpm test:integration
```

## Resultado observado e pendência
A suíte PostgreSQL ainda não foi executada porque o Docker Desktop Engine não estava disponível. Configure `TEST_DB_HOST`, `TEST_DB_PORT`, `TEST_DB_USERNAME`, `TEST_DB_PASSWORD` e `TEST_DB_NAME` para um banco exclusivo antes de executá-la. Não há resultado de integração PostgreSQL a reportar nesta etapa.
