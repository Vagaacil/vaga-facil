# Artefato 1 — Análise técnica do caso de uso

## Identificação

- **Código:** UC06
- **Nome:** Cadastrar Pátio e Vagas
- **Ator principal:** Administrador do Estabelecimento
- **Objetivo:** Deixar o pátio pronto para operar.
- **Resultado observável:** Pátio com vagas cadastradas.
- **Situação informada:** Novo.

## Objetivo e escopo funcional

Permitir que o administrador disponibilize um pátio cadastrado e registre as vagas que compõem esse pátio. O planejamento cobre o domínio, os contratos, a aplicação, a persistência, a API HTTP e os testes necessários para o fluxo de cadastro.

## Atores

- **Administrador do Estabelecimento:** responsável por informar os dados do pátio e das vagas e concluir o cadastro.

## Pré-condições e pós-condições

A documentação fornecida não detalha pré-condições nem pós-condições além do resultado observável. Proposta técnica para validação da equipe: o administrador deve estar autorizado, e o pátio/vagas cadastrados devem ficar persistidos e disponíveis para os demais módulos após conclusão.

## Síntese dos fluxos

- **Fluxo principal:** não especificado nos materiais fornecidos. A proposta mínima é: o ator solicita o cadastro, informa os dados do pátio e das vagas, envia a operação e recebe confirmação.
- **Fluxos alternativos:** não especificados.
- **Fluxos de exceção:** não especificados; devem ser confirmados pela equipe (por exemplo, dados inválidos, duplicidade ou falha de persistência).

## Regras de negócio documentadas

Não há regras numeradas ou detalhadas na documentação recebida. As únicas informações confirmadas são:

1. O ator é o Administrador do Estabelecimento.
2. A operação deve produzir um pátio com vagas cadastradas.
3. O cadastro é necessário para deixar o estacionamento pronto para operar.

## Validações pendentes de confirmação

Campos obrigatórios, formatos, quantidade mínima/máxima de vagas, identificação dos tipos de vagas, restrições de duplicidade, permissões e comportamento de rollback não foram informados. Portanto, não devem ser inventados como regras definitivas nesta fase.

## Entidades e componentes envolvidos

- **Domínio:** Pátio e Vaga.
- **Aplicação:** caso de uso de cadastro e coordenação de persistência.
- **Infraestrutura:** repositórios e eventual adaptador PostgreSQL/TypeORM.
- **API:** controller e contratos de entrada/saída.
- **Testes:** validação de sucesso, validações pendentes e persistência.

## Considerações arquiteturais preliminares

O projeto utiliza NestJS 12, TypeScript, ESM, Vitest e monólito modular. A UC06 pode compor um novo módulo administrativo ou um módulo de gestão de estabelecimento, conforme decisão da equipe. A definição dos componentes será proposta técnica até haver confirmação de arquitetura de domínio.

## Restrições e fontes

- Stack confirmada pelo repositório: NestJS, TypeScript, ESM, Vitest, pnpm e PostgreSQL preparado opcionalmente via TypeORM.
- Não foram fornecidos: especificação detalhada, precondições, pós-condições completas, fluxos e regras de negócio.

## Dúvidas indispensáveis

1. Quais campos identificam e descrevem um Pátio?
2. Quais dados e estados são obrigatórios para uma Vaga?
3. Como vagas são identificadas dentro do Pátio?
4. É permitido cadastrar pátio vazio?
5. O cadastro ocorre com uma lista de vagas ou em operações separadas?
6. Existe associação entre administrador, estabelecimento e pátio?
7. Quais duplicidades devem ser rejeitadas?
8. Quem autoriza a ativação e quais códigos HTTP/contratos são exigidos pela equipe?
