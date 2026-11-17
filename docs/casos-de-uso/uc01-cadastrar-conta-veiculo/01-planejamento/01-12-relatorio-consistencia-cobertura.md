# UC01 - Cadastrar Conta e Veiculo: 01 12 Relatorio Consistencia Cobertura

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Relatorio de consistencia**

## Cobertura
Implementacao: src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

Teste rastreavel: reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.

Regras: Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.

ultima suite real: 6 arquivos, 31 testes aprovados. Build e lint dirigido aprovados. Gap: PostgreSQL Nao foi iniciado; concorrencia multi-processo Nao foi empiricamente validada.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
