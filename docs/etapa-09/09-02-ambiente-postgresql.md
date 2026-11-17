# 09-02 — Ambiente PostgreSQL

## Infraestrutura existente
O projeto já continha:
- `docker-compose.yml` com serviço `postgres`
- `.env.example` com variáveis de ambiente para PostgreSQL
- suporte a `DB_ENABLED=true` no módulo da aplicação

## Verificação do ambiente
O cliente Docker e o Docker Compose estão instalados, mas o Docker Desktop Engine não estava disponível durante esta execução. O comando abaixo foi tentado e falhou antes de iniciar o serviço porque o pipe do engine não foi encontrado:

```bash
docker compose up -d postgres
```

Portanto, não foi possível validar uma conexão PostgreSQL real nesta máquina. O `docker-compose.yml` existente declara apenas o banco de desenvolvimento; não há serviço isolado para testes PostgreSQL.

## Salvaguardas aplicadas
- Não foi feito `docker compose down -v`.
- Não houve sobrescrita do `.env` com senhas reais.
- Nenhum teste foi apontado para o banco de desenvolvimento: a configuração de testes agora exige `TEST_DB_*` e recusa credenciais ou nome do banco iguais aos de desenvolvimento.
- Antes de executar a suíte PostgreSQL, configure e verifique um banco de testes exclusivo. A validação real permanece pendente.
