# UC04 - Registrar Entrada: 01 02 Decomposicao Unidades Trabalho

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Registrar Entrada (POST /patios/:patioId/permanencias).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Registrar Entrada (POST /patios/:patioId/permanencias).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Registrar Entrada (POST /patios/:patioId/permanencias).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Registrar Entrada (POST /patios/:patioId/permanencias).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Registrar Entrada (POST /patios/:patioId/permanencias).

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
