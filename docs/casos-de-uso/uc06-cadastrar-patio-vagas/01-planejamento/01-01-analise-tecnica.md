# UC06 - Cadastrar Patio e Vagas: 01 01 Analise Tecnica

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Administrador do Estabelecimento. Objetivo: Cadastrar Patio e Vagas. Fluxo: Cadastrar Patio, Vagas e consultar por Patio sem compartilhar Ocupacao.

## Regras e alternativos
Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.

Erros: 400 payload; 404 Patio; 409 codigo duplicado; 503 Persistencia.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
