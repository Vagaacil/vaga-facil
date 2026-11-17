# 08-07 — Preparação conceitual para persistência real

## Arquitetura atual
Controller -> Service -> Repository Token -> InMemoryRepository

## Arquitetura futura
Controller -> Service -> Repository Token -> PostgreSQL Repository / TypeORM Repository

## Componentes preservados
- Controller
- Service
- Entidade de domínio
- Interface do repositório
- Token de injeção

## Componentes a evoluir
- adaptador concreto de persistência;
- entidades ORM;
- configuração de conexão;
- migrations;
- provider real no módulo.

## Limitações da persistência em memória
- dados voláteis;
- não compartilhados entre instâncias;
- ausência de transação real;
- limitação de concorrência;
- não representa o banco relacional de produção.
