# UC07 - Definir Tarifa Vigente: 01 02 Decomposicao Unidades Trabalho

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Definir Tarifa Vigente (POST/GET /patios/:patioId/tarifas; GET tarifa-vigente).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Definir Tarifa Vigente (POST/GET /patios/:patioId/tarifas; GET tarifa-vigente).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Definir Tarifa Vigente (POST/GET /patios/:patioId/tarifas; GET tarifa-vigente).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Definir Tarifa Vigente (POST/GET /patios/:patioId/tarifas; GET tarifa-vigente).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Definir Tarifa Vigente (POST/GET /patios/:patioId/tarifas; GET tarifa-vigente).

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
