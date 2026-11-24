# Artefato 4 — Sub-Issues completas

## [SUB-01] Modelar Pátio, Vaga e contrato de cadastro

### Objetivo
Definir os conceitos de Pátio e Vaga necessários ao UC06.

### Descrição
Formalizar propriedades mínimas, identificadores e relações, usando somente dados confirmados pela equipe. Registrar como dívida técnica e pendência qualquer informação ausente.

### Requisito de origem
UC06: cadastrar pátio e vagas; resultado observável é um pátio com vagas cadastradas.

### Escopo
- Identificação de entidades/objetos.
- Relação entre Pátio e Vagas.
- Invariantes confirmadas.
- Decisões pendentes registradas.

### Critérios de aceite
- [ ] Pátio e Vaga possuem representação definida.
- [ ] Associação entre eles está descrita.
- [ ] Nenhuma regra inventada é apresentada como requisito confirmado.
- [ ] Pendências estão explicitamente relacionadas às decisões da equipe.

### Dependências
Nenhuma técnica; depende da resolução dos dados essenciais com o responsável pelo caso de uso.

### Labels sugeridas
`uc06`, `domain`, `feature`, `priority-high`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
Modelo revisado, diagramas ou classes propostas sem implementação concluída, e lista de decisões pendentes.

---

## [SUB-02] Criar contratos HTTP de cadastro e resposta

### Objetivo
Definir contratos de entrada e saída do cadastro.

### Descrição
Criar DTOs e esquema de resposta. Os campos serão definidos somente após confirmação; incluir erros apenas para condições formalmente aprovadas.

### Requisitos e origem
Actor Administrador do Estabelecimento; resultado pátio com vagas cadastradas.

### Critérios de aceite
- [ ] Contratos refletem os campos confirmados.
- [ ] Resposta de sucesso representa o resultado observável.
- [ ] Respostas de erro são documentadas.
- [ ] Não existe campo obrigatório inferido sem aprovação.

### Dependências
SUB-01.

### Labels
`uc06`, `api`, `feature`, `priority-high`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
Arquivos de contrato, exemplos de payload e revisão da equipe.

---

## [SUB-03] Implementar serviço de aplicação do cadastro

### Objetivo
Coordenar a operação administrativa de cadastro.

### Descrição
Implementar um Application Service que receba o comando confirmado, aplique apenas validações aprovadas, coordene entidades e persistência e devolva o resultado.

### Critérios de aceite
- [ ] Chamada de aplicação executa o fluxo principal confirmado.
- [ ] Regras são separadas da API.
- [ ] Persistência ocorre por meio de interface/repositório.
- [ ] Falhas são propagadas sem criar estados intermediários inconsistentes.

### Dependências
SUB-01 e SUB-02.

### Labels
`uc06`, `application`, `feature`, `priority-high`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
Implementação, testes unitários e revisão arquitetural.

---

## [SUB-04] Definir e implementar persistência de Pátio e Vagas

### Objetivo
Persistir o pátio com suas vagas.

### Descrição
Definir repositório, entidades ou esquema de banco conforme decisão da equipe. Garantir consistência da operação conforme contrato aprovado.

### Critérios de aceite
- [ ] Existe forma de salvar o pátio e suas vagas.
- [ ] A leitura futura consegue identificar a associação cadastrada.
- [ ] Falha de persistência não resulta em resposta falsa de sucesso.
- [ ] Estratégia de banco/migrações está definida antes da implementação.

### Dependências
SUB-01; SUB-03 para o contrato do repositório.

### Labels
`uc06`, `infra`, `feature`, `priority-medium`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
Interface de repositório, adaptador, migração e testes previstos.

---

## [SUB-05] Expor endpoint de cadastro administrativo

### Objetivo
Disponibilizar UC06 pela API HTTP.

### Descrição
Criar controller/rota e integrar service. Aplicar autorização somente quando o mecanismo estiver confirmado.

### Critérios de aceite
- [ ] Endpoint registrado e acessível.
- [ ] Envio válido produz resultado observável confirmado.
- [ ] Erros aprovados retornam respostas consistentes.
- [ ] Qualquer controle de acesso implementado corresponde ao ator definido.

### Dependências
SUB-02, SUB-03 e SUB-04.

### Labels
`uc06`, `api`, `feature`, `priority-high`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
Controller, endpoint demonstrável, testes HTTP e documentação da rota.

---

## [SUB-06] Registrar testes de domínio, aplicação e API

### Objetivo
Cobrir o comportamento verificável de UC06.

### Descrição
Adicionar testes unitários e e2e para os cenários confirmados. Cenários não documentados devem permanecer pendentes até decisão da equipe.

### Critérios de aceite
- [ ] Fluxo de sucesso confirmado possui teste.
- [ ] Validações aprovadas possuem testes negativos.
- [ ] Falhas de persistência possuem comportamento esperado testado.
- [ ] Testes usam Vitest e passam pelo fluxo existente do projeto.

### Dependências
SUB-01 a SUB-05; pode-se começar em paralelo com rascunhos de cenários.

### Labels
`uc06`, `test`, `priority-high`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
Arquivos de teste, resultado de execução e revisão dos cenários.

---

## [SUB-07] Documentar evidências, configuração e uso

### Objetivo
Registrar como UC06 será configurado, executado e validado.

### Descrição
Atualizar documentação técnica com payloads, erros, persistência necessária e instruções de teste.

### Critérios de aceite
- [ ] Contrato final está documentado.
- [ ] Comandos de teste e execução estão corretos.
- [ ] Decisões pendentes não são apresentadas como implementadas.
- [ ] Evidências futuras podem ser relacionadas às Sub-Issues.

### Dependências
SUB-02 e SUB-05; acompanha os demais artefatos.

### Labels
`uc06`, `documentation`, `priority-low`

### Responsável
A definir.

### Estado inicial
Backlog.

### Evidências
README/guia atualizado e exemplos HTTP revisados.
