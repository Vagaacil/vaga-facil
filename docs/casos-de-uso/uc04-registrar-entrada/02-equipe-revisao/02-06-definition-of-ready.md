# UC04 - Registrar Entrada: 02 06 Definition Of Ready

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**DoR-01 a DoR-07**

## DoR-01 a DoR-07
- DoR-01 objetivo/ator; DoR-02 fluxo principal e alternativos; DoR-03 regras; DoR-04 Dependencias; DoR-05 aceites observaveis; DoR-06 dados/limites; DoR-07 Assignee e Reviewer distintos.

## Revisao da equipe
Caso UC04: Registrar Entrada. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `RN01, RN07, RN08, RN09 e INV-S1; ClockPort unico; entrada reservada pelo titular.`, endpoint `POST /patios/:patioId/permanencias`, excecoes `400 Placa; 404 Patio; 409 lotado/Placa presente; 503 infraestrutura.` e rastreabilidade `parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
