# UC10 - Consultar Indicadores de Ocupacao: 06 06 Integracao Controlada

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Integracao controlada**

## Refactor e Revisao
Caso: Consultar Indicadores de Ocupacao.

- Regras preservadas: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.
- Erros: 404 Patio inexistente; 503 leitura indisponivel.
- Arquivos: src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts
- Testes: parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
