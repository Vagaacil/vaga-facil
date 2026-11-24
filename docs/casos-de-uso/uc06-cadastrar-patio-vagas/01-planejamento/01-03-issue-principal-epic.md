# UC06 - Cadastrar Patio e Vagas: 01 03 Issue Principal Epic

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Issue principal pronta para GitHub**

## Issue principal - UC06
Como Administrador do Estabelecimento, quero cadastrar Patio e vagas.

### Escopo
Cadastrar Patio, Vagas e consultar por Patio sem compartilhar Ocupacao.

### Aceite
- Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.
- Cobrir: 400 payload; 404 Patio; 409 codigo duplicado; 503 Persistencia.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
