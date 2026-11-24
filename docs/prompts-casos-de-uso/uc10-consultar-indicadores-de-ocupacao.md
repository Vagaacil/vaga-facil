# Prompt — UC10 Consultar Indicadores de Ocupacao

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC10 — Consultar Indicadores de Ocupacao**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Administrador da Rede.
- Objetivo: acompanhar a ocupacao da rede.
- Resultado: indicadores exibidos.
- Situacao no documento: novo.
- Dependencias conhecidas: permanencias registradas por UC04 e UC05.
- O documento trata o painel como canal de interface, nao como objetivo isolado.

## Restricoes

Nao presuma indicadores, periodos, rede, unidades, formula de ocupacao, atualizacao em tempo real, agregacoes ou semantica HTTP. Confirme quais indicadores pertencem a este caso de uso.

## Trabalhos

1. Inspecione o repositorio e recupere especificacoes de indicadores.
2. Identifique a Issue e as dependencias de dados.
3. Trate indicadores como consultas derivadas, nao como comandos.
4. Defina fontes de dados a partir de estados persistidos.
5. Separe consulta HTTP de calculos e agregacoes complexas.
6. Garanta consistencia de patio, rede e periodo conforme especificacao aprovada.
7. Evite criar painel ou tela antes da API e contratos terem criterios confirmados.
8. Implemente testes das consultas e dados resultantes.
9. Execute testes, lint, build e verificacao HTTP.
10. Documente indicadores, formulas e pendencias.
