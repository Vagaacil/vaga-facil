# UC06 - Cadastrar Patio e Vagas: 03 05 Politica Wip

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Politica WIP**

## Priorizacao e fluxo
Priorizar pelo risco de estado e pelas Dependencias: Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.

Separar contratos, Persistencia, HTTP, testes e documentacao em SUBs coesas; executar primeiro Dependencias efetivas, Nao apenas ordem numerica. Para 3 integrantes, WIP maximo sugerido: uma unidade ativa por pessoa e uma Revisao por pessoa.

Risco/impedimento: PostgreSQL TypeORM ainda sem teste contra instancia real. Prontidao: criterios e Cenarios em `parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.`.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
