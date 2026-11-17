# UC06 - Cadastrar Patio e Vagas: 01 02 Decomposicao Unidades Trabalho

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Cadastrar Patio e Vagas (POST /patios; POST/GET /patios/:patioId/vagas).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Cadastrar Patio e Vagas (POST /patios; POST/GET /patios/:patioId/vagas).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Cadastrar Patio e Vagas (POST /patios; POST/GET /patios/:patioId/vagas).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Cadastrar Patio e Vagas (POST /patios; POST/GET /patios/:patioId/vagas).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Cadastrar Patio e Vagas (POST /patios; POST/GET /patios/:patioId/vagas).

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
