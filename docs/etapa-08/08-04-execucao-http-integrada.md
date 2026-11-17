# 08-04 — Execução HTTP integrada

## Cenário válido
- `POST /orders/reservation-1/confirm`
- `POST /parking-stays/stay-1/checkout`

## Observações
- a rota foi atendida;
- o controller foi executado;
- o service real foi chamado;
- o provider real do repositório em memória foi resolvido;
- a resposta HTTP foi retornada com payload correto.

## Diagnóstico de armazenamento
A resposta HTTP comprova que o fluxo real foi executado. Já a inspeção direta do repositório em memória foi feita via a própria instância resolvida pelo módulo, e não apenas pela resposta do cliente.
