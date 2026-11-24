# Artefato 8 — Planejamento do GitHub Project

## Configuração do board

Criar campos obrigatórios:

1. `Backlog`
2. `Ready`
3. `In Progress`
4. `In Review`
5. `Done`

Não criar estados como Todo, No Status ou Planned.

## Distribuição inicial

| Issue/Sub-Issue | Status inicial | Justificativa |
|---|---|---|
| `[UC06] Cadastrar Pátio e Vagas` | Backlog | A especificação detalhada e a definição de prontidão ainda estão pendentes |
| SUB-01 — Modelar Pátio, Vaga e contrato de cadastro | Backlog | Dados essenciais não confirmados |
| SUB-02 — Criar contratos HTTP | Backlog | Depende de SUB-01 e da decisão de campos |
| SUB-03 — Implementar serviço de aplicação | Backlog | Depende de modelo e contrato |
| SUB-04 — Persistência de Pátio/Vagas | Backlog | Estratégia e contrato ainda não definidos |
| SUB-05 — Endpoint de cadastro | Backlog | Depende da integração das camadas |
| SUB-06 — Testes automatizados | Backlog | Fluxos e validações não detalhados |
| SUB-07 — Documentação/evidências | Backlog | Contrato final ainda inexistente |

Nenhuma atividade inicia em `Ready` até a equipe confirmar Definition of Ready, responsável, dependências desbloqueadas e critérios de aceite executáveis.

## Campos recomendados adicionais

- Responsável
- Prioridade
- Caso de uso (`UC06`)
- Dependências
- Evidência esperada
- Data alvo, se a equipe usar planejamento temporal

Os campos adicionais não substituem os cinco status obrigatórios.
