# UC02 - Reservar Vaga: 01 03 Issue Principal Epic

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Issue principal pronta para GitHub**

## Issue principal - UC02
Como Motorista, quero reservar vaga.

### Escopo
Validar titularidade, expirar retencoes, reservar primeira Vaga livre da categoria e salvar prazo.

### Aceite
- RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros.
- Cobrir: 404 cadastros ausentes; 409 sem vaga, incompatibilidade ou Reserva ativa.
- Build, lint dirigido e Vitest verdes.

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]. Labels: epic, feature, domain, persistence, api, test.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
