# Artefato 6 — Matriz de dependências

| Atividade | Pré-requisitos | Justificativa técnica | Condição de desbloqueio | Paralelização possível |
|---|---|---|---|---|
| SUB-01 | Confirmar dados essenciais do UC06 | Pátio/Vaga são base do modelo e contratos | Equipe informa campos, identificação e relação | Não até haver decisões básicas; pode iniciar levantamento de dúvidas em paralelo |
| SUB-02 | SUB-01 | DTOs devem representar o modelo aprovado | Modelo mínimo e contratos disponíveis | Parcialmente com SUB-03, após SUB-01 |
| SUB-03 | SUB-01, SUB-02 | Service depende do comando e do modelo | Contratos mínimos compiláveis | Sim com rascunho de SUB-04, mas integração posterior |
| SUB-04 | SUB-01; SUB-03 para interface | Persistência precisa conhecer entidade e assinatura de repositório | Modelo aprovado e interface definida | Sim, usando implementação em memória primeiro |
| SUB-05 | SUB-02, SUB-03, SUB-04 | Controller integra entrada, aplicação e persistência | Fluxo ponta a ponta disponível em interfaces/implementações mínimas | Não até integração das dependências |
| SUB-06 | SUB-01 a SUB-05 | Testes validam cada camada e o contrato HTTP | Cenários definidos e implementação disponível em suas respectivas áreas | Documentação de cenários pode iniciar imediatamente; execução em paralelo por camada |
| SUB-07 | SUB-02 e SUB-05 | Documentação depende do contrato final e da rota | Contrato estabelecido e endpoint integrado | Sim desde o início em esqueleto, finalização após rota |

## Caminho crítico provável

`Confirmação de requisitos → SUB-01 → SUB-02/SUB-03/SUB-04 → SUB-05 → SUB-06 → SUB-07`.

O caminho crítico atual inclui uma confirmação externa da especificação; enquanto não houver campos, fluxos, validações e permissões, nenhuma implementação deveria tratar hipóteses como regras definitivas.
