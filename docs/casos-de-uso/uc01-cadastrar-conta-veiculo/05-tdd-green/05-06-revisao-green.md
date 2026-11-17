# UC01 - Cadastrar Conta e Veiculo: 05 06 Revisao Green

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Revisao GREEN**

## TDD GREEN - mapeamento
Teste: `reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.`

Producao: src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

Aceite: Validar dados, normalizar Placa e vincular Veiculo ao Motorista; Placa e e-mail sao unicos.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
