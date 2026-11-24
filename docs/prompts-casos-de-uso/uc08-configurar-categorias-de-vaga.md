# Prompt — UC08 Configurar Categorias de Vaga

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC08 — Configurar Categorias de Vaga**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Administrador do Estabelecimento.
- Objetivo: diferenciar tipos de vaga e suas regras.
- Resultado: categorias disponiveis para as vagas.
- Situacao no documento: novo.
- Contexto: Administracao e Configuracao.
- Relacao conhecida: categorias sao consultadas por UC02 e podem afetar a compatibilidade definida pela pendente RN06.

## Restricoes

Nao invente categorias padrao, atributos, matriz de compatibilidade, regras por tipo de veiculo, quantidade ou semantica HTTP. RN06 permanece pendente ate resposta da equipe.

## Trabalhos

1. Inspecione o repositorio e recupere especificacao, Issues e dependencias.
2. Modele Categoria de Vaga apenas com dados confirmados.
3. Defina contrato de cadastro e atualizacao aprovado pela equipe.
4. Estabeleca persistencia da associacao entre categoria e vaga.
5. Nao implemente compatibilidade veiculo-categoria como regra definitiva enquanto RN06 estiver pendente.
6. Implemente aplicacao, API e testes de fluxos confirmados.
7. Verifique efeitos em UC02 sem criar acoplamento indevido.
8. Execute testes, lint, build e verificacao HTTP.
9. Atualize documentacao e rastreabilidade.
