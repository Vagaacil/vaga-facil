# UC10 - Consultar Indicadores de Ocupacao: 01 04 Sub Issues

**Ator:** Administrador da Rede
**Endpoint:** `GET /indicadores/ocupacao; GET /patios/:patioId/indicadores`
**Cinco Sub-issues com aceite e Dependencias**

## Cinco Sub-issues

### SUB-01 - Modelo e invariantes
**Motivo:** Manter estados e regras em metodos de dominio.
**Aceite:** mudanca funcional rastreavel para Consultar Indicadores de Ocupacao; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-02 - Portas e Persistencia
**Motivo:** Implementar InMemory/TypeORM e transacao/concorrencia.
**Aceite:** mudanca funcional rastreavel para Consultar Indicadores de Ocupacao; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-03 - Command e HTTP
**Motivo:** Validar transporte, delegar caso de uso e mapear semantica.
**Aceite:** mudanca funcional rastreavel para Consultar Indicadores de Ocupacao; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-04 - Testes Vitest
**Motivo:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro.
**Aceite:** mudanca funcional rastreavel para Consultar Indicadores de Ocupacao; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-05 - Integracao e documentacao
**Motivo:** Consolidar rastreabilidade, EXECUCAO e evidencias reais.
**Aceite:** mudanca funcional rastreavel para Consultar Indicadores de Ocupacao; falha Nao pode gerar sucesso silencioso; teste Vitest associado.

## Rastreabilidade local
src/modules/occupancy/controllers/indicadores.controller.ts; src/modules/occupancy/repositories/in-memory-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: medias/estados; test/app.e2e-spec.ts indicadores.
