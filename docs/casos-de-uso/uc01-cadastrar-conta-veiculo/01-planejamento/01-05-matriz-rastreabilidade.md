# UC01 - Cadastrar Conta e Veiculo: 01 05 Matriz Rastreabilidade

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos. | src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts | reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva. |
| HTTP | `POST /motoristas; POST /motoristas/:motoristaId/veiculos` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
