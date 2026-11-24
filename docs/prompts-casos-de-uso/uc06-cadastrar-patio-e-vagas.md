# Prompt — UC06 Cadastrar Patio e Vagas

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC06 — Cadastrar Patio e Vagas**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Administrador do Estabelecimento.
- Objetivo: deixar o patio pronto para operar.
- Resultado observavel: patio com vagas cadastradas.
- Situacao no documento: novo.
- Contexto: Administracao e Configuracao.

## Bloqueios conhecidos

Do planejamento existente, nao foram confirmados:

- campos obrigatorios do patio;
- dados obrigatorios da vaga;
- identificador e formato das vagas;
- quantidade minima ou maxima;
- permitida cadastro de patio vazio;
- cadastro unico ou em etapas separadas;
- associacao com estabelecimento e administrador;
- regras de duplicidade;
- autorizacao e codigos HTTP.

## Implementacao obrigatoria

1. Leia todos os artefatos de UC06 em docs/planejamento/uc06.
2. Registre o diagnostico antes de criar codigo.
3. Pare antes da modelagem definitiva se ainda existirem bloqueios indispensaveis.
4. Confirme ou proponha dados sem assumir que a proposta foi aprovada.
5. Modele Patio e Vaga apenas com conceitos documentados ou aprovados.
6. Implemente contrato HTTP, Service, repositorio e persistencia no padrao do projeto.
7. Preserve atomicidade entre o cadastro do patio e suas vagas.
8. Nao conceda acesso administrativo sem especificacao e mecanismo aprovado.
9. Adicione testes de sucesso e erros formalmente definidos.
10. Execute teste, lint, build e verificacao HTTP.

## Criterios de aceite

- dados essenciais formalmente confirmados;
- fluxo principal demonstravel;
- relacao persistida entre patio e vagas;
- entradas invalidas e falhas aprovadas tratadas;
- API, dominio, persistencia, testes e documentacao coerentes.
