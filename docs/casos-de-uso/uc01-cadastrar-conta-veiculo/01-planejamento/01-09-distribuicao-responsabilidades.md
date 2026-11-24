# UC01 - Cadastrar Conta e Veiculo: 01 09 Distribuicao Responsabilidades

**Ator:** Motorista
**Endpoint:** `POST /motoristas; POST /motoristas/:motoristaId/veiculos`
**Distribuicao de equipe segregada**

## Assignee - Reviewer

- SUB-01: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-02: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.
- SUB-03: Assignee **Ian Fernandes Borges**; Reviewer **Bruno Rocco Wolfardt**.
- SUB-04: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-05: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.

Somente os tres integrantes reais sao utilizados. Mapear logins GitHub apos confirmacao; Nao inventar usernames.

## Rastreabilidade local
src/modules/orders/entities/motorista.entity.ts; src/modules/orders/entities/veiculo.entity.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: cadastro/normalizacao; test/app.e2e-spec.ts: fluxo de reserva.
