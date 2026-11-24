# Prompt — UC02 Reservar Vaga

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC02 — Reservar Vaga**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Motorista.
- Objetivo: garantir uma vaga antes de chegar.
- Resultado: Reserva confirmada ou recusa informada.
- Situacao no documento: revisado.
- Contexto: Reservas e Clientes.
- Pre-condicoes documentadas: motorista com pelo menos um veiculo cadastrado via UC01 e patio existente.
- Pos-condicao documentada: reserva confirmada retendo uma vaga dentro do tempo de tolerancia.
- RN04: reserva so e confirmada quando existe vaga disponivel na categoria.
- RN03 e RN06 permanecem como hipotese ou questao ate confirmacao da equipe.

## Fluxo principal documentado

1. Motorista informa patio e categoria desejada.
2. Sistema consulta disponibilidade em Ocupacao e Acesso.
3. Sistema verifica vaga disponivel na categoria conforme RN04.
4. Sistema confirma a reserva e retém a vaga pelo tempo de tolerancia, conforme RN03 quando confirmado.
5. Sistema informa o resultado ao motorista.

## Fluxos alternativos documentados

- Sem disponibilidade na categoria: reserva nao confirmada e motorista informado.
- Ocupacao e Acesso indisponivel: falha relevante e reserva nao confirmada.
- Disponibilidade muda antes da confirmacao concorrente: recusar ou reavaliar conforme decisao registrada pela equipe.

## Implementacao

1. Inspecione os modulos existentes de reservas e ocupacao.
2. Preserve os limites entre Reservas e Clientes e Ocupacao e Acesso.
3. Implemente um contrato claro entre os contextos para consultar disponibilidade.
4. Nao adicione compatibilidade por categoria enquanto RN06/Q01 estiverem pendentes.
5. Nao trate expiracao de reserva como UC isolado; registre-a como processo interno ate haver decisao contraria.
6. Implemente DTOs, Controller, Service, entidade, repositorio e testes conforme o padrao real do projeto.
7. Implemente concorrencia necessaria sem perder rastreabilidade de falha.
8. Execute testes unitarios, integrados, e2e, lint e build.
9. Atualize documentacao HTTP e evidencias de GitHub.

## Restricoes

Nao invente duracao da tolerancia, categoria obrigatoria, formato da reserva ou semantica HTTP. Qualquer pendencia deve ser registrada como decisao necessaria, nao implementada por presuncao.
