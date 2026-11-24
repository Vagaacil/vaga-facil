# 13-05 - Coleção containerizada

A pasta `containerizado/` contém smoke, cenário principal e apoio. O Compose possui `api` e `postgres`.

Verificado:

- API saudável em `http://localhost:3002`.
- PostgreSQL saudável.
- PostgreSQL publicado em `5433` para não conflitar com outro projeto local.

O script cria no máximo um Pátio e uma Vaga. Não executa migrations, não remove volumes e reinicia somente `api`.
