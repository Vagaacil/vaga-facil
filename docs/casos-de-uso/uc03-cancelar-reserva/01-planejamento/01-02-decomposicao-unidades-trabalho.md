# UC03 - Cancelar Reserva: 01 02 Decomposicao Unidades Trabalho

**Ator:** Motorista
**Endpoint:** `POST /reservas/:reservaId/cancelar`
**Unidades de trabalho tecnicamente justificadas**

## Unidades tecnicamente justificadas

- **SUB-01 - Modelo e invariantes:** Manter estados e regras em metodos de dominio. Aplicacao: Cancelar Reserva (POST /reservas/:reservaId/cancelar).
- **SUB-02 - Portas e Persistencia:** Implementar InMemory/TypeORM e transacao/concorrencia. Aplicacao: Cancelar Reserva (POST /reservas/:reservaId/cancelar).
- **SUB-03 - Command e HTTP:** Validar transporte, delegar caso de uso e mapear semantica. Aplicacao: Cancelar Reserva (POST /reservas/:reservaId/cancelar).
- **SUB-04 - Testes Vitest:** Cobrir sucesso, alternativas, bordas e Nao mutacao em erro. Aplicacao: Cancelar Reserva (POST /reservas/:reservaId/cancelar).
- **SUB-05 - Integracao e documentacao:** Consolidar rastreabilidade, EXECUCAO e evidencias reais. Aplicacao: Cancelar Reserva (POST /reservas/:reservaId/cancelar).

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** reservation-workflows.service.spec.ts: cancelamento e liberacao; test/app.e2e-spec.ts.
