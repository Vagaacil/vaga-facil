# UC04 - Registrar Entrada: 01 04 Sub Issues

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Cinco Sub-issues com aceite e Dependencias**

## Cinco Sub-issues

### SUB-01 - Modelo e invariantes
**Motivo:** Manter estados e regras em metodos de dominio.
**Aceite:** mudanca funcional rastreavel para Registrar Entrada; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-02 - Portas e Persistencia
**Motivo:** Implementar InMemory/TypeORM e transacao/concorrencia.
**Aceite:** mudanca funcional rastreavel para Registrar Entrada; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-03 - Command e HTTP
**Motivo:** Validar transporte, delegar caso de uso e mapear semantica.
**Aceite:** mudanca funcional rastreavel para Registrar Entrada; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-04 - Testes Vitest
**Motivo:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro.
**Aceite:** mudanca funcional rastreavel para Registrar Entrada; falha Nao pode gerar sucesso silencioso; teste Vitest associado.
### SUB-05 - Integracao e documentacao
**Motivo:** Consolidar rastreabilidade, EXECUCAO e evidencias reais.
**Aceite:** mudanca funcional rastreavel para Registrar Entrada; falha Nao pode gerar sucesso silencioso; teste Vitest associado.

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
