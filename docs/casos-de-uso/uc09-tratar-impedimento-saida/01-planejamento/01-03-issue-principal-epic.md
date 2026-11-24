# UC09 - Tratar Impedimento de Saida: 01 03 Issue Principal Epic

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Issue principal pronta para GitHub**

## Issue principal - UC09
Como Operador de Portaria, quero tratar impedimento de Saida.

### Escopo
Validar decisao e persistir auditoria atomicamente com eventual fechamento/liberacao.

### Aceite
- Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.
- Cobrir: 400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
