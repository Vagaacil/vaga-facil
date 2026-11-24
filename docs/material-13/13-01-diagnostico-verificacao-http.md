# 13-01 - Diagnóstico da verificação HTTP

## Estado observado

- Porta real: `3002`.
- Framework: NestJS 12 com `ValidationPipe({ whitelist: true, transform: true })`.
- Persistência: PostgreSQL via `DB_ENABLED=true`.
- Compose: serviços `api` e `postgres`; o PostgreSQL externo é publicado em `5433`.
- Pasta `http-rest-client/`: criada nesta execução.
- Código da aplicação não foi alterado.

## Contratos confirmados

Todos os casos UC01–UC10 possuem rotas reais no código. Os principais cenários foram derivados dos controllers, DTOs e exceções existentes.

## Lacunas

- Não há migrations versionadas; o projeto usa TypeORM `synchronize` fora de produção.
- Não existe suíte de persistência isolada declarada em `package.json`.
- Cenários que dependem de IDs encadeados não podem ser reproduzidos pela coleção manual sem respostas anteriores ou seed.
