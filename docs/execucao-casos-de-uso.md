# Execucao dos Casos de Uso

## Linha de base

- Testes unitarios: 13 passando.
- Testes e2e: 4 passando.
- Build: passando.
- Lint: passando.
- Validacao executada sem modificar o codigo existente.
- Alteracoes desta execucao: UC03 Cancelar Reserva.

## Validacao realizada

- `vitest run`: 4 arquivos e 13 testes aprovados.
- `vitest run test/app.e2e-spec.ts`: 1 arquivo e 4 testes e2e aprovados.
- Build NestJS: aprovado.
- ESLint dos arquivos `src`, `test` e `vitest.config.ts`: aprovado.
- GitHub CLI: nao autenticado neste ambiente; Issues, Projects e Pull Requests nao foram consultados ou alterados.

## Estado por caso

| Caso | Estado | Evidencia | Pendencia |
|---|---|---|---|
| UC01 Cadastrar Conta e Veiculo | Bloqueado | Documentacao identifica ator, objetivo e resultado. | Campos da conta e veiculo, formato da placa, unicidade, autenticacao e contrato HTTP nao foram confirmados. |
| UC02 Reservar Vaga | Parcial | Confirmacao existente de reserva no repositorio e a entidade possuem o fluxo base. | A especificacao exige criacao e consulta de disponibilidade; nao existe contrato confirmado de categoria, patio, tolerancia ou rota de criacao. |
| UC03 Cancelar Reserva | Implementado | Entidade, Service, Controller, DTO, testes unitarios e e2e. | Confirmar liberacao integrada da vaga e contrato HTTP externo em publicacao. |
| UC04 Registrar Entrada de Veiculo | Bloqueado para implementacao completa | Fluxo, pre-condicoes, pos-condicoes e RN01/RN08/RN09 estao documentados. | Falta o modelo implementado de Patio/Vaga e a confirmacao da integracao pelo Ponto de Acesso; rota HTTP nao foi especificada no documento. |
| UC05 Concluir Saida do Veiculo | Parcial | Checkout existente implementa permanencia fechada, calculo da tarifa e liberacao do modelo em memoria. | Integracao real de pagamento, tarifa vigente persistida e tratamento RN05 nao estao confirmados. |
| UC06 Cadastrar Patio e Vagas | Bloqueado | Artefatos de planejamento UC06 existem. | Campos, identificadores, quantidade de vagas, patio vazio, operacao unica/separada, duplicidade e autorizacao nao foram confirmados. |
| UC07 Definir Tarifa Vigente | Bloqueado | RN02 vincula a tarifa ao momento da saida. | Modelo de preco, vigencia, moeda, faixas e contrato HTTP nao foram confirmados. |
| UC08 Configurar Categorias de Vaga | Bloqueado | UC02 referencia categorias. | Categorias permitidas, atributos e compatibilidade RN06 nao foram confirmados. |
| UC09 Tratar Impedimento de Saida | Bloqueado | UC05 define a ocorrencia de impedimentos. | Processo de autorizacao manual, auditabilidade e resolucao definitiva nao foram confirmados. |
| UC10 Consultar Indicadores de Ocupacao | Bloqueado | Dependencia conhecida de permanencias registradas. | Lista de indicadores, formulas, periodicidade, filtros e contrato HTTP nao foram confirmados. |

## UC03 - entrega realizada

### Alteracoes

- Estado CANCELLED na reserva.
- Metodo de dominio para cancelamento.
- Excecao para reserva ja cancelada.
- DTO de resposta.
- Rota `POST /orders/:reservationId/cancel`.
- Testes unitarios e e2e.
- Requisicao HTTP adicionada em `requests.http`.

### Comportamento coberto

- Reserva inexistente.
- Cancelamento de reserva pendente.
- Reserva ja cancelada.
- Resposta com identificador e status.

## Decisoes preservadas

Os casos sem especificacao suficiente nao receberam classes, campos ou rotas presumidos. Essa decisao segue os prompts e evita que a implementacao transforme hipoteses em requisitos definitivos.

## Proximas acoes

1. Confirmar os dados essenciais de UC06.
2. Fechar RN06, RN03 e os fluxos de UC01 e UC02.
3. Implementar UC04 apos a definicao de Patio/Vaga e da porta de entrada.
4. Integrar UC05 com tarifa vigente e confirmacao real de pagamento.
5. Confirmar os indicadores de UC10 e os processos excepcionais de UC09.
