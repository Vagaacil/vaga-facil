# UC01 - Cadastrar Conta e Veiculo: 02 06 Definition Of Ready

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**DoR-01 a DoR-07**

## DoR-01 a DoR-07
- DoR-01 objetivo/ator; DoR-02 fluxo principal e alternativos; DoR-03 regras; DoR-04 Dependencias; DoR-05 aceites observaveis; DoR-06 dados/limites; DoR-07 Assignee e Reviewer distintos.

## Revisao da equipe
Caso UC01: Cadastrar Conta e Veiculo. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.`, endpoint `POST /motoristas; POST /motoristas/:motoristaId/veiculos`, excecoes `400 payload invalido; 404 Motorista ausente; 409 duplicidade.` e rastreabilidade `reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
