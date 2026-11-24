# UC10 - Consultar Indicadores de Ocupacao: 01 09 Distribuicao Responsabilidades

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Distribuicao de equipe segregada**

## Assignee - Reviewer

- SUB-01: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-02: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.
- SUB-03: Assignee **Ian Fernandes Borges**; Reviewer **Bruno Rocco Wolfardt**.
- SUB-04: Assignee **Bruno Rocco Wolfardt**; Reviewer **Felipe Sousa da Costa**.
- SUB-05: Assignee **Felipe Sousa da Costa**; Reviewer **Ian Fernandes Borges**.

Somente os tres integrantes reais sao utilizados. Mapear logins GitHub apos confirmacao; Nao inventar usernames.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
