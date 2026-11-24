#!/usr/bin/env bash
set -u

BASE="${BASE_URL:-http://localhost:3003}"
OUTPUT="${SEED_OUTPUT:-.tmp/seed-scenarios.json}"

cd "$(dirname "$0")/.." || exit 1
mkdir -p .tmp

docker compose up -d postgres_test test-api >/dev/null

attempt=0
while [ "$attempt" -lt 60 ]; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "$BASE/" || true)"
  [ "$code" = "200" ] && break
  attempt=$((attempt + 1))
  sleep 1
done

if [ "$attempt" -ge 60 ]; then
  echo "FALHA: test-api não ficou disponível em $BASE"
  exit 1
fi

docker compose exec -T postgres_test sh -c \
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "TRUNCATE TABLE exit_impediments, payment_transactions, parking_stays, legacy_parking_stays, reservations_v2, reservations, registered_vehicles, drivers, current_tariffs, parking_spots, parking_spot_categories, patios CASCADE;"' \
  >/dev/null 2>&1

post() {
  curl -sS -H 'Content-Type: application/json' -d "$2" "$BASE$1"
}

patio=$(post '/patios' '{"nome":"Pátio Seed Isolado"}')
patio_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(v.patioId||'')" <<<"$patio")

spot=$(post "/patios/$patio_id/vagas" '{"codigo":"SEED-01","categoria":"PADRAO"}')
spot_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(v.vagaId||'')" <<<"$spot")

entry_spot=$(post "/patios/$patio_id/vagas" '{"codigo":"SEED-02","categoria":"PADRAO"}')

tariff=$(post "/patios/$patio_id/tarifas" '{"valorPorHora":18,"fracaoMinutos":60,"toleranciaMinutos":0}')

category=$(post "/patios/$patio_id/categorias-vaga" '{"codigo":"MOTO","descricao":"Motocicletas","tiposVeiculoCompativeis":["MOTO"]}')

driver=$(post '/motoristas' '{"nome":"Motorista Seed","email":"seed@example.com"}')
driver_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(v.motoristaId||'')" <<<"$driver")

vehicle=$(post "/motoristas/$driver_id/veiculos" '{"placa":"ABC-1001","tipo":"CARRO"}')
vehicle_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(v.veiculoId||'')" <<<"$vehicle")

entry_vehicle=$(post "/motoristas/$driver_id/veiculos" '{"placa":"DEF-2002","tipo":"CARRO"}')

reservation=$(post '/reservas' "{\"patioId\":\"$patio_id\",\"motoristaId\":\"$driver_id\",\"veiculoId\":\"$vehicle_id\",\"categoria\":\"PADRAO\"}")
reservation_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(v.reservaId||'')" <<<"$reservation")

entry=$(post "/patios/$patio_id/permanencias" '{"placa":"DEF-2002"}')
entry_id=$(node -e "const fs=require('fs');const v=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(v.registroId||'')" <<<"$entry")

if [ -z "$patio_id" ] || [ -z "$spot_id" ] || [ -z "$driver_id" ] || [ -z "$vehicle_id" ] || [ -z "$reservation_id" ] || [ -z "$entry_id" ]; then
  echo "FALHA: seed não produziu todos os identificadores"
  exit 1
fi

node - "$OUTPUT" "$patio_id" "$spot_id" "$driver_id" "$vehicle_id" "$reservation_id" "$entry_id" <<'NODE'
const fs = require('fs');
const [, , output, patioId, spotId, driverId, vehicleId, reservationId, entryId] = process.argv;
fs.writeFileSync(output, JSON.stringify({
  patioId,
  spotId,
  driverId,
  vehicleId,
  reservationId,
  entryId,
}, null, 2));
NODE

echo "Seed concluído em $BASE"
echo "IDs gravados em $OUTPUT"
