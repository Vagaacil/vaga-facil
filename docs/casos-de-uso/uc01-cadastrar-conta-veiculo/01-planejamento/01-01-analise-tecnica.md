# UC01 - Cadastrar Conta e Veiculo: 01 01 Analise Tecnica

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Motorista. Objetivo: Cadastrar Conta e Veiculo. Fluxo: Cadastrar Motorista e depois seu Veiculo.

## Regras e alternativos
Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.

Erros: 400 payload invalido; 404 Motorista ausente; 409 duplicidade.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
