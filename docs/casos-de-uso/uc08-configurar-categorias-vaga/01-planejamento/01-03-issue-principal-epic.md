# UC08 - Configurar Categorias de Vaga: 01 03 Issue Principal Epic

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Issue principal pronta para GitHub**

## Issue principal - UC08
Como Administrador do Estabelecimento, quero configurar categorias de vaga.

### Escopo
Cadastrar codigos e tipos compativeis; associar Vaga; validar antes de reservar.

### Aceite
- RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.
- Cobrir: 400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
