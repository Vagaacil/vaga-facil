# UC02 - Reservar Vaga: 01 06 Matriz Dependencias

**Ator:** Motorista
**Endpoint:** `POST /reservas`
**Dependencias explicitas**

## Dependencias refinadas
UC06 (Patio/Vaga) - pre-requisito de UC02; UC01 (Motorista/Veiculo) e UC08 (Categoria) antecedem UC02; UC07 antecede UC05.

No caso: RN03 retencao por 15 minutos; RN04 vaga livre; RN06 compatibilidade de categoria; exigir cadastros.

**Paralelismo:** testes e documentacao podem evoluir junto ao dominio apos estabilizacao dos contratos; Nao dividir artificialmente RED/GREEN.

## Rastreabilidade local
src/modules/orders/entities/reserva.entity.ts; src/modules/orders/services/orders.service.ts; src/modules/occupancy/entities/vaga.entity.ts

**Vitest:** reservation-workflows.service.spec.ts: reserva, expiracao e compatibilidade; test/app.e2e-spec.ts.
