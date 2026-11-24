# UC10 - Consultar Indicadores de Ocupacao: 05 02 Mapeamento Producao Testes

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Mapa producao/teste**

## TDD GREEN - mapeamento
Teste: `parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.`

Producao: src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

Aceite: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.

Evidencia integral em 05-05; Nao duplicar falha RED ficticia.

TypeORM passou compilacao, mas PostgreSQL Nao foi exercitado nesta sessao.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
