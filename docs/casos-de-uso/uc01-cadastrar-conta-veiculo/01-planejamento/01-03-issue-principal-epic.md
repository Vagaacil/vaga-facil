# UC01 - Cadastrar Conta e Veiculo: 01 03 Issue Principal Epic

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Issue principal pronta para GitHub**

## Issue principal - UC01
Como Motorista, quero cadastrar conta e Veiculo.

### Escopo
Cadastrar Motorista e depois seu Veiculo.

### Aceite
- Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.
- Cobrir: 400 payload invalido; 404 Motorista ausente; 409 duplicidade.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
