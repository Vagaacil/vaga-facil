# Artefato 12 — Relatório de consistência e cobertura

## Síntese quantitativa

- **Issues principais planejadas:** 1 Epic.
- **Sub-Issues planejadas:** 7.
- **Total de itens de planejamento:** 8.
- **Artefatos gerados:** 12.

## Cobertura confirmada

A documentação recebida confirma:

- Código UC06 e nome Cadastrar Pátio e Vagas.
- Ator Administrador do Estabelecimento.
- Objetivo de deixar o pátio pronto para operar.
- Resultado observável de pátio com vagas cadastradas.

Esses itens estão cobertos pelo Epic, pela matriz de rastreabilidade, pelas unidades de trabalho e pelo plano do board.

## Cobertura insuficiente

Não foram fornecidos:

- Pré-condições detalhadas.
- Pós-condições detalhadas.
- Fluxo principal completo.
- Fluxos alternativos.
- Fluxos de exceção.
- Campos do Pátio e das Vagas.
- Identificadores ou estados.
- Regras de negócio numeradas.
- Permissões/autorização.
- Contrato HTTP.
- Estratégia obrigatória de persistência.

Consequentemente, SUB-01 e SUB-02 devem preceder decisões de implementação. O artefato não define regras como existirem ou não.

## Caminho crítico

1. Resolver lacunas da especificação.
2. SUB-01 — modelagem.
3. SUB-02 — contratos.
4. SUB-03 — aplicação.
5. SUB-04 — persistência.
6. SUB-05 — API.
7. SUB-06 — testes.
8. SUB-07 — documentação.

## Decisões técnicas pendentes

São propostas técnicas, não requisitos confirmados:

- Novo módulo administrativo versus módulo de gestão de estabelecimento.
- Cadastro conjunto de pátio e vagas versus cadastros separados.
- Implementação inicial em memória versus PostgreSQL direto.
- Tipo e formato dos identificadores.
- Uso de TypeORM versus persistência por interface, conforme a arquitetura da equipe.
- Política de autorização do Administrador.

## Riscos

| Risco | Impacto | Recomendação |
|---|---|---|
| Campos e regras não definidos | Retrabalho de domínio/API | Resolver junto ao responsável pelo caso de uso antes de SUB-01 |
| Modelo Pátio/Vaga incompatível com outros módulos | Bloqueio futuro de reserva, entrada e saída | Revisar conceitos já usados por outros módulos no projeto |
| Implementação de persistência prematura | Migração/reversão custosa | Aprovar contrato do repositório antes de adaptar banco |
| Autorização não definida | API executada sem controle adequado | Confirmar mecanismo de autenticação/autorização antes de implementar SUB-05 |
| Testes de hipóteses como regras reais | Cobertura falsa e produto incorreto | Testar somente cenários confirmados pela documentação/equipe |

## Conclusão

O planejamento UC06 está completo como conjunto de artefatos, rastreável e coerente com os materiais disponíveis. Porém, a implementação não está pronta para iniciar pois a especificação funcional e técnica contém lacunas indispensáveis. O estado recomendado é manter todas as issues em Backlog e resolver SUB-01/especificação antes de mover itens para Ready.

Nenhum código-fonte foi implementado, nenhuma branch foi criada e nenhum teste foi executado, conforme a restrição exclusiva de planejamento.
