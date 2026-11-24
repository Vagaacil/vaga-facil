# UC04 - Registrar Entrada: 01 03 Issue Principal Epic

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Issue principal pronta para GitHub**

## Issue principal - UC04
Como Motorista via Ponto de Acesso, quero registrar entrada.

### Escopo
Validar Placa/Patio, expirar holds, priorizar titular, alocar primeira livre e persistir Vaga + Registro atomicamente.

### Aceite
- RN01, RN07, RN08, RN09 e INV-S1; ClockPort unico; entrada reservada pelo titular.
- Cobrir: 400 Placa; 404 Patio; 409 lotado/Placa presente; 503 infraestrutura.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
