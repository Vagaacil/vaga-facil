# UC13 — Listar Pátios

## Identificação

- Código: UC13
- Nome: Listar Pátios
- Sistema: Vaga Fácil
- Módulo: Administração e Configuração / Ocupação e Acesso
- Tipo: Consulta
- Referência: UC06 — Cadastrar Pátio e Vagas

## Entidade e campos

| Campo     | Retornado | Justificativa                                                                   |
| --------- | --------- | ------------------------------------------------------------------------------- |
| `patioId` | Sim       | Identificador persistido necessário para encadear vagas, tarifas e permanências |
| `nome`    | Sim       | Dado confirmado no cadastro de Pátios                                           |

Não são adicionados novos atributos à entidade.

## Objetivo

Permitir consultar os Pátios cadastrados de forma paginada e determinística.

## Contrato HTTP

- `GET /patios?page=1&limit=20`
- Resposta `200`:

```json
{
  "items": [{ "patioId": "uuid", "nome": "Pátio Central" }],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

## Regras

- RN01: `page` é inteiro maior ou igual a 1; padrão `1`.
- RN02: `limit` é inteiro entre 1 e 100; padrão `20`.
- RN03: Pátios são ordenados por `nome` e, em empate, por `patioId`.
- RN04: Nenhum Pátio removido/inativo foi identificado na entidade; todos os registros são considerados ativos.
- RN05: A ausência de registros é sucesso com `items: []` e `total: 0`.
- RN06: Falha de consulta não expõe detalhes internos e resulta em erro de persistência/infraestrutura.

## Fluxo principal

1. Cliente solicita `GET /patios`.
2. O sistema transforma e valida `page` e `limit`.
3. O Service consulta a operação aditiva do Repository.
4. O Repository ordena e pagina os Pátios.
5. O sistema devolve itens e metadados.

## Fluxo alternativo

- Não há Pátios cadastrados: retorna `200` com lista vazia.

## Fluxo de exceção

- Parâmetros inválidos: `400 Bad Request`.
- Falha de persistência: tratamento registrado pelo filtro global de banco.

## Critérios de aceite

- CA01: a listagem retorna somente `patioId` e `nome`.
- CA02: lista vazia retorna sucesso.
- CA03: a ordem é por nome e identificador como desempate.
- CA04: paginação respeita limite máximo de 100.
- CA05: parâmetros inválidos são rejeitados antes da consulta.
- CA06: memória e PostgreSQL possuem o mesmo contrato.
