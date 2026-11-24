# Artefato 5 — Matriz de rastreabilidade

| Requisito/regra/fluxo | Sub-Issue | Atividade associada | Critério de aceite | Comportamento futuro verificável |
|---|---|---|---|---|
| UC06 identificado como Cadastrar Pátio e Vagas | SUB-01, SUB-07 | Modelagem e documentação | Código/nome usados sem ambiguidade | Issue e documentação referenciam UC06 |
| Ator é Administrador do Estabelecimento | SUB-02, SUB-05 | Contrato e acesso HTTP | Operação associada ao ator; autorização depende de decisão confirmada | Acesso do ator autorizado é confirmado em teste quando autenticação existir |
| Objetivo: deixar o pátio pronto para operar | SUB-01, SUB-03, SUB-04 | Domínio, aplicação e persistência | Cadastro deixa o pátio em estado definido pela equipe | Teste verifica o estado final aprovado |
| Resultado: pátio com vagas cadastradas | SUB-01, SUB-03, SUB-04, SUB-05 | Cadastro completo | Pátio e vagas permanecem associados | Reconsulta ou resultado confirma associação persistida |
| Dados de entrada do pátio | SUB-01, SUB-02, SUB-03 | Campos de modelo e DTO | Campos definidos pela equipe | Validação de campos confirmados |
| Dados de entrada das vagas | SUB-01, SUB-02, SUB-03, SUB-04 | Modelo e persistência das vagas | Campos e restrições confirmados | Cadastro rejeita entradas inválidas aprovadas e aceita dados válidos |
| Fluxo principal | SUB-03, SUB-05, SUB-06 | Coordenação e API | Fluxo confirmado implementado | Teste e2e do sucesso |
| Fluxos alternativos | SUB-06 | Cobertura de cenários | Nenhum fluxo inventado antes da especificação | Testar cenários formalmente fornecidos pela equipe |
| Fluxos de exceção | SUB-03, SUB-05, SUB-06 | Erros e persistência | Erros definidos pela equipe | Testar cada exceção confirmada |

## Lacunas

- Não há cobertura de campos ou identificadores ainda não informados; isso não representa atividade sem justificativa, mas bloqueio de especificação.
- Não há fluxo principal detalhado.
- Não há pré-condições nem pós-condições detalhadas.
- Não há regras de negócio numeradas.
- Não há requisitos de autorização/HTTP definidos.
- Todos esses itens exigem confirmação ou complementação da documentação antes da implementação definitiva.
