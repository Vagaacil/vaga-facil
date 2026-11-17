# UC09 - Tratar Impedimento de Saida: 01 02 Decomposicao Unidades Trabalho

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Tratar Impedimento de Saida (POST /permanencias/:registroId/resolver-impedimento).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Tratar Impedimento de Saida (POST /permanencias/:registroId/resolver-impedimento).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Tratar Impedimento de Saida (POST /permanencias/:registroId/resolver-impedimento).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Tratar Impedimento de Saida (POST /permanencias/:registroId/resolver-impedimento).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Tratar Impedimento de Saida (POST /permanencias/:registroId/resolver-impedimento).

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
