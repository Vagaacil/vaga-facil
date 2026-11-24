# UC10 - Consultar Indicadores de Ocupacao: 01 06 Matriz Dependencias

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Dependencias explicitas**

## Dependencias refinadas
UC06 (Patio/Vaga) - pre-requisito de UC10; UC01 (Motorista/Veiculo) e UC08 (Categoria) antecedem UC02; UC07 antecede UC05.

No caso: Contagens separadas; taxa ocupadas/total; media de permanencias fechadas; isolamento de Patio.

**Paralelismo:** testes e documentacao podem evoluir junto ao dominio apos estabilizacao dos contratos; Nao dividir artificialmente RED/GREEN.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
