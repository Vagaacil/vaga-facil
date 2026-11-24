# UC04 - Registrar Entrada: 01 01 Analise Tecnica

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Motorista via Ponto de Acesso. Objetivo: Registrar Entrada. Fluxo: Validar Placa/Patio, expirar holds, priorizar titular, alocar primeira livre e persistir Vaga + Registro atomicamente.

## Regras e alternativos
RN01, RN07, RN08, RN09 e INV-S1; ClockPort unico; entrada reservada pelo titular.

Erros: 400 Placa; 404 Patio; 409 lotado/Placa presente; 503 infraestrutura.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
