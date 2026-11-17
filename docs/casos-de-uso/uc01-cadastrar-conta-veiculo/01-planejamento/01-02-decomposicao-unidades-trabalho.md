# UC01 - Cadastrar Conta e Veiculo: 01 02 Decomposicao Unidades Trabalho

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Cadastrar Conta e Veiculo (POST /motoristas; POST /motoristas/:motoristaId/veiculos).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Cadastrar Conta e Veiculo (POST /motoristas; POST /motoristas/:motoristaId/veiculos).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Cadastrar Conta e Veiculo (POST /motoristas; POST /motoristas/:motoristaId/veiculos).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Cadastrar Conta e Veiculo (POST /motoristas; POST /motoristas/:motoristaId/veiculos).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Cadastrar Conta e Veiculo (POST /motoristas; POST /motoristas/:motoristaId/veiculos).

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
