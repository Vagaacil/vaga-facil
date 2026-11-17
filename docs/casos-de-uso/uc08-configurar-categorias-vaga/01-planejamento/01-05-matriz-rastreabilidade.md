# UC08 - Configurar Categorias de Vaga: 01 05 Matriz Rastreabilidade

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Matriz regra - codigo - teste**

| Regra/contrato | Implementacao | Teste/evidencia |
|---|---|---|
| RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre. | src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts | reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts. |
| HTTP | `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria` | `test/app.e2e-spec.ts` quando indicado |

TypeORM Nao foi validado contra servico PostgreSQL nesta EXECUCAO.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
