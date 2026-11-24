#!/usr/bin/env bash
# Verificação automatizada do ambiente containerizado (API + banco em Docker Compose).
# Uso: ./http-rest-client/containerizado/run-checks.sh [--durability]
# --durability reinicia SOMENTE a API e confere o registro no banco.
# Não remove volumes, não usa down -v e grava no máximo um pátio e uma vaga.
set -u

BASE="${BASE_URL:-http://localhost:3002}"
cd "$(dirname "$0")/../.." || exit 1

pass=0
fail=0
patio_id=""

check() {
  local description="$1"
  local expected="$2"
  local obtained="$3"
  if [ "$expected" = "$obtained" ]; then
    echo "ok - $description (esperado=$expected, obtido=$obtained)"
    pass=$((pass + 1))
  else
    echo "FALHA - $description (esperado=$expected, obtido=$obtained)"
    fail=$((fail + 1))
  fi
}

status() {
  curl --silent --show-error --output /dev/null --write-out '%{http_code}' "$@"
}

body_post() {
  curl --silent --show-error --request POST "$1" --header 'Content-Type: application/json' --data "$2"
}

body_and_status_post() {
  curl --silent --show-error --request POST "$1" --header 'Content-Type: application/json' --data "$2" --write-out '\n%{http_code}'
}

json_field() {
  node -e "const fs=require('fs'); try { const v=JSON.parse(fs.readFileSync(0,'utf8')); process.stdout.write(v.patioId || '') } catch { process.stdout.write('') }"
}

docker_service_status() {
  docker compose ps --format json 2>/dev/null
}

echo "Verificando ambiente em $BASE"

api_status="$(docker compose ps api --format json | grep -c '"State":"running"' || true)"
postgres_status="$(docker compose ps postgres --format json | grep -c '"Health":"healthy"' || true)"
check "serviço api no estado running" "1" "$api_status"
check "serviço postgres saudável" "1" "$postgres_status"

check "GET /" "200" "$(status "$BASE/")"
check "rota inexistente" "404" "$(status "$BASE/rota-inexistente")"

echo "Migrations: projeto usa synchronize fora de produção; não há migration:run nesta verificação"

invalid_status="$(status --request POST "$BASE/patios" --header 'Content-Type: application/json' --data '{"nome":""}')"
check "UC06 valida nome vazio" "400" "$invalid_status"

suffix="$(date +%Y%m%d%H%M%S)"
patio_response="$(body_and_status_post "$BASE/patios" "{\"nome\":\"Pátio REST $suffix\"}")"
patio_status="$(printf '%s' "$patio_response" | tail -n 1)"
patio_body="$(printf '%s' "$patio_response" | sed '$d')"
patio_id="$(printf '%s' "$patio_body" | json_field '\"patioId\"')"
if [ -n "$patio_id" ]; then
  check "UC06 cadastro válido" "201" "$patio_status"

  spot_response="$(body_and_status_post "$BASE/patios/$patio_id/vagas" "{\"codigo\":\"HTTP-$suffix\",\"categoria\":\"PADRAO\"}")"
  vaga_status="$(printf '%s' "$spot_response" | tail -n 1)"
  check "UC06 vaga válida" "201" "$vaga_status"

  sql_result="$(docker compose exec -T postgres sh -c "psql -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -tA -c \"SELECT count(*) FROM patios WHERE \\\"patioId\\\" = '$patio_id';\"" 2>/dev/null | tr -d '[:space:]' || true)"
else
  check "UC06 cadastro válido" "201" "sem identificador"
fi

check "UC03 reserva inexistente" "404" "$(status --request POST "$BASE/reservas/inexistente/cancelar" --header 'Content-Type: application/json')"
check "UC02 reserva sem motorista" "400" "$(status --request POST "$BASE/reservas" --header 'Content-Type: application/json' --data '{"patioId":"p","veiculoId":"v"}')"
check "UC10 indicadores da rede" "200" "$(status "$BASE/indicadores/ocupacao")"
check "UC13 lista de pátios" "200" "$(status "$BASE/patios?page=1&limit=20")"
check "UC14 identificador inválido" "400" "$(status "$BASE/patios/not-a-uuid")"
check "UC14 UUID válido inexistente" "404" "$(status "$BASE/patios/00000000-0000-4000-8000-000000000000")"

if [ -n "$patio_id" ]; then
  check "registro existe no PostgreSQL" "1" "${sql_result:-0}"
fi

if [ "${1:-}" = "--durability" ] && [ -n "$patio_id" ]; then
  docker compose restart api >/dev/null 2>&1
  restarted=0
  attempt=0
  while [ "$attempt" -lt 30 ]; do
    obtained="$(status "$BASE/" || true)"
    if [ "$obtained" = "200" ]; then
      restarted=1
      break
    fi
    attempt=$((attempt + 1))
    sleep 1
  done
  check "API voltou após restart" "1" "$restarted"

  sql_result_after="$(docker compose exec -T postgres sh -c "psql -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -tA -c \"SELECT count(*) FROM patios WHERE \\\"patioId\\\" = '$patio_id';\"" 2>/dev/null | tr -d '[:space:]' || true)"
  check "registro após restart" "1" "${sql_result_after:-0}"
elif [ "${1:-}" = "--durability" ]; then
  check "durabilidade exige identificador" "1" "0"
fi

echo
echo "Resultado: $pass ok, $fail falha(s)"
[ "$fail" -eq 0 ]
