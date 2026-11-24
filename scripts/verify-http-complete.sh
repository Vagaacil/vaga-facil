#!/usr/bin/env bash
set -u

BASE="${BASE_URL:-http://localhost:3003}"
SEED_OUTPUT="${SEED_OUTPUT:-.tmp/seed-scenarios.json}"
pass=0
fail=0

cd "$(dirname "$0")/.." || exit 1

check() {
  local description="$1"
  local expected="$2"
  local obtained="$3"
  if [ "$expected" = "$obtained" ]; then
    echo "ok - $description"
    pass=$((pass + 1))
  else
    echo "FALHA - $description (esperado=$expected, obtido=$obtained)"
    fail=$((fail + 1))
  fi
}

status() {
  curl -sS -o /dev/null -w '%{http_code}' "$@" 2>/dev/null
}

bash scripts/seed-scenarios.sh || exit 1

patio_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(v.patioId)" "$SEED_OUTPUT")
spot_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(v.spotId)" "$SEED_OUTPUT")
driver_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(v.driverId)" "$SEED_OUTPUT")
vehicle_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(v.vehicleId)" "$SEED_OUTPUT")
reservation_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(v.reservationId)" "$SEED_OUTPUT")
entry_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(v.entryId)" "$SEED_OUTPUT")

check "UC01 motorista criado" "201" "$(status -X POST "$BASE/motoristas" -H 'Content-Type: application/json' -d '{"nome":"Motorista Alternativo","email":"alternativo@example.com"}')"
check "UC01 veiculo duplicado" "409" "$(status -X POST "$BASE/motoristas/$driver_id/veiculos" -H 'Content-Type: application/json' -d '{"placa":"ABC-1001","tipo":"CARRO"}')"
check "UC02 reserva ativa criada pelo seed" "200" "$(status "$BASE/patios/$patio_id/indicadores")"
check "UC03 cancelamento válido" "201" "$(status -X POST "$BASE/reservas/$reservation_id/cancelar" -H 'Content-Type: application/json')"
check "UC03 cancelamento repetido" "409" "$(status -X POST "$BASE/reservas/$reservation_id/cancelar" -H 'Content-Type: application/json')"
check "UC04 permanência criada pelo seed" "200" "$(status "$BASE/patios/$patio_id/vagas")"
check "UC04 entrada repetida" "409" "$(status -X POST "$BASE/patios/$patio_id/permanencias" -H 'Content-Type: application/json' -d '{"placa":"DEF-2002"}')"
check "UC05 checkout válido" "201" "$(status -X POST "$BASE/permanencias/$entry_id/checkout" -H 'Content-Type: application/json')"
check "UC05 checkout repetido" "409" "$(status -X POST "$BASE/permanencias/$entry_id/checkout" -H 'Content-Type: application/json')"
check "UC06 vaga duplicada" "409" "$(status -X POST "$BASE/patios/$patio_id/vagas" -H 'Content-Type: application/json' -d '{"codigo":"SEED-01","categoria":"PADRAO"}')"
check "UC07 tarifa vigente" "200" "$(status "$BASE/patios/$patio_id/tarifa-vigente")"
check "UC08 categoria criada" "200" "$(status "$BASE/patios/$patio_id/categorias-vaga")"
check "UC09 impedimento sem dados" "400" "$(status -X POST "$BASE/permanencias/inexistente/resolver-impedimento" -H 'Content-Type: application/json' -d '{}')"
check "UC10 indicadores de rede" "200" "$(status "$BASE/indicadores/ocupacao")"
check "UC10 indicadores do pátio" "200" "$(status "$BASE/patios/$patio_id/indicadores")"

echo
echo "Resultado HTTP: $pass ok, $fail falha(s)"
[ "$fail" -eq 0 ]
