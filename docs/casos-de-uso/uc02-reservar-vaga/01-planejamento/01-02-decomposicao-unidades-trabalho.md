# UC02 - Reservar Vaga: 01 02 Decomposicao Unidades Trabalho

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Reservar Vaga (POST /reservas).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Reservar Vaga (POST /reservas).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Reservar Vaga (POST /reservas).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Reservar Vaga (POST /reservas).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Reservar Vaga (POST /reservas).

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
