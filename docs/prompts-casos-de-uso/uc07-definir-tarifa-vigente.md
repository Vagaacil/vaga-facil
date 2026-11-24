# Prompt — UC07 Definir Tarifa Vigente

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC07 — Definir Tarifa Vigente**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Administrador do Estabelecimento.
- Objetivo: estabelecer o preco cobrado no patio.
- Resultado: tarifa vigente registrada para o patio.
- Situacao no documento: novo.
- Contexto: Administracao e Configuracao.
- Relacao conhecida: a tarifa vigente e consumida pelo calculo de UC05, segundo RN02.

## Restricoes

Nao presuma modelo de preco, periodicidade, vigencia, moeda, categorias, faixas de horario, identificadores, historico, validacoes ou semantica HTTP. Confirme esses dados antes da implementacao.

## Trabalhos

1. Inspecione o repositorio e procure especificacoes ou entidades existentes.
2. Identifique a Issue responsavel e as dependencias de UC07.
3. Defina o conceito de vigencia sem inventar periodos ou regras.
4. Se a especificacao aprovada definir historico, preserve tarifas anteriores e apenas uma tarifa vigente por escopo confirmado.
5. Implemente dominio, aplicacao, persistencia e API conforme padroes reais.
6. Garanta que UC05 passe a localizar a tarifa vigente do patio no momento da saida.
7. Adicione testes de validade, vigencia e recusas confirmadas.
8. Execute testes, lint, build e verificacao HTTP.
9. Documente o contrato e pendencias nao resolvidas.
