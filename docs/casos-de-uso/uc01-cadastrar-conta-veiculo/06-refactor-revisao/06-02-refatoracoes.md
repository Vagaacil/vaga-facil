# UC01 - Cadastrar Conta e Veiculo: 06 02 Refatoracoes

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Refatoracoes aplicadas/preservadas**

## Refactor e Revisao
Caso: Cadastrar Conta e Veiculo.

- Regras preservadas: Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.
- Erros: 400 payload invalido; 404 Motorista ausente; 409 duplicidade.
- Arquivos: src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts
- Testes: reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
