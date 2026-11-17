# UC07 - Definir Tarifa Vigente: 01 09 Distribuicao Responsabilidades

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Distribuicao de equipe segregada**

## Assignee - Reviewer

- SUB-01: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-02: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.
- SUB-03: Assignee **Ian Fernandes Borges**; Reviewer **Bruno Rocco Wolfardt**.
- SUB-04: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-05: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.

Somente os tres integrantes reais sao utilizados. Mapear logins GitHub apos confirmacao; Nao inventar usernames.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
