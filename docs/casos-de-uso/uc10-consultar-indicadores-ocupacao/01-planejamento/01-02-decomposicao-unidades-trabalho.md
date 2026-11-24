# UC10 - Consultar Indicadores de Ocupacao: 01 02 Decomposicao Unidades Trabalho

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Consultar Indicadores de Ocupacao (GET /indicadores/ocupacao; GET /patios/:patioId/indicadores).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Consultar Indicadores de Ocupacao (GET /indicadores/ocupacao; GET /patios/:patioId/indicadores).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Consultar Indicadores de Ocupacao (GET /indicadores/ocupacao; GET /patios/:patioId/indicadores).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Consultar Indicadores de Ocupacao (GET /indicadores/ocupacao; GET /patios/:patioId/indicadores).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Consultar Indicadores de Ocupacao (GET /indicadores/ocupacao; GET /patios/:patioId/indicadores).

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
