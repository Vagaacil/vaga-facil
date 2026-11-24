# Coleção REST Client Containerizada

Esta coleção verifica o Vaga Fácil em execução local ou no Docker Compose.

## Pré-requisitos

```bash
docker compose up -d --build api
docker compose ps
```

Os serviços esperados são `api` publicado em `http://localhost:3002` e `postgres` saudável.

## Conteúdo

| Arquivo | Uso |
|---|---|
| `00-smoke.http` | Sanidade da raiz e rota inexistente |
| `01-patios-vagas-caso-principal.http` | Contrato principal de UC06 |
| `02-reservas-cancelamento.http` | Contratos de apoio de UC02 e UC03 |
| `run-checks.sh` | Verificação automatizada com asserções |

Os arquivos `.http` são apenas cenários repetíveis para a extensão REST Client. Eles não fazem asserções.

## Verificação automatizada

```bash
./http-rest-client/containerizado/run-checks.sh
./http-rest-client/containerizado/run-checks.sh --durability
BASE_URL=http://localhost:9 ./http-rest-client/containerizado/run-checks.sh
```

O script conta falhas e continua sem `set -e`. Ele cria no máximo dois registros por execução: um pátio e uma vaga. Não remove volumes, não altera migrations e reinicia somente `api`.

## Consulta SQL manual

```bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT * FROM patios;"'
docker compose restart api
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT * FROM patios;"'
```
