# UC06 - Cadastrar Patio e Vagas: 05 02 Mapeamento Producao Testes

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Mapa producao/teste**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.`

Producao: src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

Aceite: Vaga inicial Livre, codigo unico no Patio, isolamento RN08 e PADRAO H10.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
