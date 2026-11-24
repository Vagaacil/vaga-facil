# Artefato 3 — Issue principal (Epic)

## Título

`[UC06] Cadastrar Pátio e Vagas`

## Objetivo geral

Implementar o cadastro de um pátio com suas vagas, permitindo ao Administrador do Estabelecimento deixar o ambiente pronto para operação.

## Contexto e escopo

O caso de uso pertence à área administrativa do sistema Vaga Fácil. O projeto é um monólito modular em NestJS/TypeScript. O planejamento cobre modelagem, contratos, aplicação, persistência, API HTTP, testes e documentação deste caso de uso.

## Referência formal

- Lista de casos de uso fornecida: UC06 — Cadastrar Pátio e Vagas.
- Ator: Administrador do Estabelecimento.
- Resultado: Pátio com vagas cadastradas.

## Requisitos funcionais contemplados

- [ ] UC06 deve permitir que um Administrador do Estabelecimento inicie o cadastro do pátio.
- [ ] UC06 deve receber e validar os dados confirmados do pátio e das vagas.
- [ ] UC06 deve cadastrar o pátio com suas vagas.
- [ ] UC06 deve informar confirmação ou erro ao administrador.

## Sub-Issues planejadas

- [ ] SUB-01 — Modelar Pátio, Vaga e contrato de cadastro
- [ ] SUB-02 — Criar contratos HTTP de cadastro e resposta
- [ ] SUB-03 — Implementar serviço de aplicação do cadastro
- [ ] SUB-04 — Definir e implementar persistência de Pátio e Vagas
- [ ] SUB-05 — Expor endpoint de cadastro administrativo
- [ ] SUB-06 — Registrar testes do cadastro
- [ ] SUB-07 — Documentar evidências, configuração e uso

## Critérios gerais de aceite

- [ ] Os dados necessários do pátio e das vagas estão formalmente confirmados antes da implementação.
- [ ] O fluxo principal possui evidência automatizada.
- [ ] As entradas inválidas e erros definidos pela equipe possuem tratamento documentado.
- [ ] O cadastro gera uma associação persistida entre o pátio e suas vagas.
- [ ] Apenas o administrador autorizado acessa a operação, quando a autorização estiver definida pela equipe.
- [ ] API, persistência, testes e documentação estão consistentes com o mesmo contrato.

## Dependências externas e bloqueios

- Especificação detalhada do caso de uso.
- Lista definitiva de campos, identificadores e estados.
- Decisão sobre autorização/autenticação.
- Decisão sobre operação única versus cadastro separado de pátio e vagas.
- Persistência concreta e migrações, quando aplicáveis.

## Condições de conclusão e prontidão

A Issue estará pronta para implementação somente após resolução das dúvidas documentadas no Artefato 1 e definição da Definition of Ready pela equipe. Não presumir que campos, duplicidades ou fluxos não informados foram aprovados.
