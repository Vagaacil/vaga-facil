# 09-01 — Diagnóstico da persistência e linha de base

## Objetivo
Validar a arquitetura atual antes da migração para PostgreSQL e confirmar a linha de base dos contratos já aprovados.

## Contratos preservados
- Reserva: `Reservation`
- Checkout de permanência: `ParkingStay`
- Repositórios: `IOrdersRepository`, `IParkingStayRepository`
- Token de injeção: `ORDERS_REPOSITORY`, `PARKING_STAY_REPOSITORY`
- Controladores HTTP existentes

## Estado do projeto
A aplicação já estava funcional em memória antes da etapa 09. O ajuste desta etapa foi preservar essa funcionalidade e substituir a persistência em memória por uma implementação real com TypeORM e PostgreSQL.

## Evidência da linha de base
Comando executado:

```bash
pnpm test -- --run
```

Resultado observado:
- 4 arquivos de teste executados
- 12 testes aprovados
- 0 falhas

## Riscos e pendências
- Ainda era necessário separar a entidade ORM da entidade de domínio.
- A infraestrutura de banco ainda não estava conectada ao fluxo real do backend.
- Os testes de integração com PostgreSQL ainda não existiam.
