# UC01 - Cadastrar Conta e Veiculo: 03 06 Revisao Prontidao

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Revisao de Prontidao**

## Priorizacao e fluxo
Priorizar pelo risco de estado e pelas Dependencias: Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.

Separar contratos, Persistencia, HTTP, testes e documentacao em SUBs coesas; executar primeiro Dependencias efetivas, Nao apenas ordem numerica. Para 3 integrantes, WIP maximo sugerido: uma unidade ativa por pessoa e uma Revisao por pessoa.

Risco/impedimento: PostgreSQL TypeORM ainda sem teste contra instancia real. Prontidao: criterios e Cenarios em `reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.`.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
