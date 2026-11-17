# UC04 - Registrar Entrada: 06 01 Diagnostico Green

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Diagnostico GREEN**

## Refactor e Revisao
Caso: Registrar Entrada.

- Regras preservadas: RN01, RN07, RN08, RN09 e INV-S1; ClockPort unico; entrada reservada pelo titular.
- Erros: 400 Placa; 404 Patio; 409 lotado/Placa presente; 503 infraestrutura.
- Arquivos: src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts
- Testes: parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
