# Prompt — UC03 Cancelar Reserva

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC03 — Cancelar Reserva**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Motorista.
- Objetivo: desistir de uma reserva.
- Resultado: reserva cancelada e vaga liberada.
- Situacao no documento: revisado.
- Contexto: Reservas e Clientes.

## Restricoes

Inspecione o repositorio antes de criar componentes. Confirme UC02 e o ciclo de vida real da Reserva antes de alterar estados. Nao invente estados permitidos, prazos, liberacao concorrente, notificacoes ou semantica HTTP.

## Trabalhos

1. Diagnostique o estado da entidade, repositorio e testes de reserva.
2. Recuperar a Issue, branch, criterio de aceite e dependencias de UC03.
3. Confirmar quais estados da reserva permitem cancelamento.
4. Definir como a vaga retida sera liberada em Ocupacao e Acesso.
5. Implementar dominio, aplicacao, persistencia e API somente quando os contratos forem confirmados.
6. Cobrir cancelamento valido, reserva inexistente, reserva ja cancelada e falha de liberacao.
7. Preservar consistencia entre Reserva e Vaga; nao deixe estado parcial.
8. Executar testes, lint e build reais.
9. Documentar contrato, evidencias e proximas pendencias.

## Criterios de aceite

So declare conclusao com evidencia automatizada do cancelamento e da liberacao da vaga. Pendencias de regra ou contrato devem permanecer explicitamente abertas.
