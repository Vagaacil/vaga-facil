# UC08 - Configurar Categorias de Vaga: 01 02 Decomposicao Unidades Trabalho

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Configurar Categorias de Vaga (POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Configurar Categorias de Vaga (POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Configurar Categorias de Vaga (POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Configurar Categorias de Vaga (POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Configurar Categorias de Vaga (POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria).

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
