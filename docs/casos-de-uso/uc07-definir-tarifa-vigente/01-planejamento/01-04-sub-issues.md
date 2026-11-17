# UC07 - Definir Tarifa Vigente: 01 04 Sub Issues

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Cinco Sub-issues com aceite e Dependencias**

## Cinco Sub-issues

### SUB-01 - Modelo e invariantes
**Motivo:** Manter estados e regras em metodos de dominio.
**Aceite:** mudanca funcional rastreavel para Definir Tarifa Vigente; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-02 - Portas e Persistencia
**Motivo:** Implementar InMemory/TypeORM e transacao/concorrencia.
**Aceite:** mudanca funcional rastreavel para Definir Tarifa Vigente; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-03 - Command e HTTP
**Motivo:** Validar transporte, delegar caso de uso e mapear semantica.
**Aceite:** mudanca funcional rastreavel para Definir Tarifa Vigente; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-04 - Testes Vitest
**Motivo:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro.
**Aceite:** mudanca funcional rastreavel para Definir Tarifa Vigente; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-05 - Integracao e documentacao
**Motivo:** Consolidar rastreabilidade, EXECUCAO e evidencias reais.
**Aceite:** mudanca funcional rastreavel para Definir Tarifa Vigente; falha Nao pode gerar sucesso silencioso; teste Vitest associado.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
