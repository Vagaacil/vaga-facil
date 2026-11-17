# UC02 - Reservar Vaga: 01 01 Analise Tecnica

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Motorista. Objetivo: Reservar Vaga. Fluxo: Validar titularidade, expirar retencoes, reservar primeira Vaga livre da categoria e salvar prazo.

## Regras e alternativos
RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros.

Erros: 404 cadastros ausentes; 409 sem vaga, incompatibilidade ou Reserva ativa.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
