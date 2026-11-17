# UC01 - Cadastrar Conta e Veiculo: 01 06 Matriz Dependencias

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Dependencias explicitas**

## Dependencias refinadas
UC06 (Patio/Vaga) - pre-requisito de UC01; UC01 (Motorista/Veiculo) e UC08 (Categoria) antecedem UC02; UC07 antecede UC05.

No caso: Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.

**Paralelismo:** testes e documentacao podem evoluir junto ao dominio apos estabilizacao dos contratos; Nao dividir artificialmente RED/GREEN.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
