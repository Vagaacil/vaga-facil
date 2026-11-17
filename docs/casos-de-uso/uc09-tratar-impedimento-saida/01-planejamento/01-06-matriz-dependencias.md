# UC09 - Tratar Impedimento de Saida: 01 06 Matriz Dependencias

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Dependencias explicitas**

## Dependencias refinadas
UC06 (Patio/Vaga) - pre-requisito de UC09; UC01 (Motorista/Veiculo) e UC08 (Categoria) antecedem UC02; UC07 antecede UC05.

No caso: Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.

**Paralelismo:** testes e documentacao podem evoluir junto ao dominio apos estabilizacao dos contratos; Nao dividir artificialmente RED/GREEN.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
