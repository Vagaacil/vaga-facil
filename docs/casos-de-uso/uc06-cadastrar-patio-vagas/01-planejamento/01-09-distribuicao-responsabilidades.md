# UC06 - Cadastrar Patio e Vagas: 01 09 Distribuicao Responsabilidades

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Distribuicao de equipe segregada**

## Assignee - Reviewer

- SUB-01: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-02: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.
- SUB-03: Assignee **Ian Fernandes Borges**; Reviewer **Bruno Rocco Wolfardt**.
- SUB-04: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-05: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.

Somente os tres integrantes reais sao utilizados. Mapear logins GitHub apos confirmacao; Nao inventar usernames.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
