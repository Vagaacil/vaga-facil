# UC04 - Registrar Entrada: 03 02 Dependencias Refinadas

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Dependencias refinadas**

## Priorizacao e fluxo
Priorizar pelo risco de estado e pelas Dependencias: RN01, RN07, RN08, RN09 e INV-S1; ClockPort unico; entrada reservada pelo titular.

Separar contratos, Persistencia, HTTP, testes e documentacao em SUBs coesas; executar primeiro Dependencias efetivas, Nao apenas ordem numerica. Para 3 integrantes, WIP maximo sugerido: uma unidade ativa por pessoa e uma Revisao por pessoa.

Risco/impedimento: PostgreSQL TypeORM ainda sem teste contra instancia real. Prontidao: criterios e Cenarios em `parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.`.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
