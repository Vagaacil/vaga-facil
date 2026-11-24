# Decisões consolidadas dos casos de uso UC01–UC10

Este registro transforma as decisões confirmadas em regras técnicas reaproveitáveis pelos fluxos implementados.

## Decisões por caso de uso

| Caso | Decisão adotada                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UC01 | Motorista possui nome e e-mail válidos; veículo possui placa normalizada e tipo. E-mail e placa são únicos.                                                   |
| UC02 | A reserva exige motorista, veículo, Pátio e categoria. A retenção dura 15 minutos e bloqueia uma reserva ativa adicional para o mesmo veículo.                |
| UC03 | Reserva ativa pode ser cancelada e libera imediatamente a Vaga. Reserva expirada passa para `EXPIRED`, não para `CANCELLED`.                                  |
| UC04 | Entrada consulta permanência aberta, ocupa uma vaga livre compatível e cria a permanência. O horário vem do servidor.                                         |
| UC05 | Saída usa horário de saída do servidor e tarifa vigente para o Pátio. Pagamento aprovado é obrigatório antes de fechar permanência e liberar vaga.            |
| UC06 | Pátio exige nome. Vaga exige código único dentro do Pátio e categoria `PADRAO` por padrão. Pátio vazio pode ser criado.                                       |
| UC07 | Tarifa usa valor por hora positivo, fração entre 1 e 60 minutos, tolerância não negativa, moeda implícita BRL e vigência histórica.                           |
| UC08 | Categoria possui código, descrição e tipos compatíveis. Categoria inexistente e incompatibilidade têm respostas específicas.                                  |
| UC09 | Impedimento registra decisão, justificativa, operador e horário. `MANTER_RETIDO` preserva permanência; `LIBERAR_MANUALMENTE` fecha permanência e libera vaga. |
| UC10 | Indicadores mínimos são totais, livres, reservadas, ocupadas, taxa de ocupação e tempo médio das permanências fechadas.                                       |

## Regras transversais

- `400 Bad Request`: dados obrigatórios ou tipos inválidos.
- `404 Not Found`: recurso inexistente.
- `409 Conflict`: conflito de estado ou incompatibilidade.
- UUID gerado pelo sistema.
- Placa aceita hífen na entrada e é armazenada normalizada.
- Reservas, entradas e saídas preservam consistência entre Reserva, Vaga e Permanência.
- Persistência real usa PostgreSQL e adaptadores TypeORM; modo didático usa repositórios em memória.
