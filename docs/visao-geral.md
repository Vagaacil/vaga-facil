# Visão geral do Vaga Fácil

## Problema e objetivo

O Vaga Fácil é uma plataforma de gestão de estacionamentos. O sistema pretende substituir registros manuais por um controle consistente de vagas, entradas, permanências, saídas, reservas e cobranças.

A arquitetura é um monólito modular, organizado pelos limites de domínio definidos nas atividades anteriores. Este documento resume o estado implementado e os próximos recortes; não substitui a especificação completa dos casos de uso nem cria novas regras.

## Primeiro slice implementado

| Elemento | Definição |
| --- | --- |
| Casos de uso | UC06 cadastrar Pátio/Vaga; UC07 definir Tarifa Vigente; UC04 registrar entrada |
| Ator | Administrador do Estabelecimento e Motorista |
| Resultado esperado | Pátio e vagas cadastrados, tarifa consultável, entrada alocada a uma vaga |
| Regras centrais | RN01 exclusividade de Vaga e RN09 permanência aberta única por Placa |
| Contexto responsável pela regra | Ocupação e Acesso |
| Conceitos principais | Pátio, Vaga, Tarifa Vigente, Placa e Registro de Permanência |

O primeiro recorte inclui cadastro de Pátio e Vaga, definição de tarifa, alocação da primeira Vaga livre e gravação atômica da entrada. O fluxo evoluiu para incluir saída com pagamento, auditoria de impedimentos, contas/veículos, categorias, reservas com retenção de 15 minutos e indicadores. A persistência InMemory é usada por padrão; os adaptadores TypeORM estão disponíveis com `DB_ENABLED=true`.

## Estado da implementação

O projeto usa NestJS 12, TypeScript, ESM, pnpm 12.15.0, Vitest e TypeORM/PostgreSQL. A aplicação expõe as rotas iniciais de cadastro de Pátio/Vaga, tarifa e entrada, além do scaffold `GET /` e dos endpoints legados de reservas e checkout.

O endpoint legado de checkout continua disponível por compatibilidade e não participa do fluxo UC05. O novo endpoint de saída usa Tarifa Vigente, processa a Transação de Pagamento e libera a Vaga junto com o fechamento do Registro de Permanência na mesma transação do adaptador TypeORM.

## Organização e execução

- Framework: NestJS.
- Linguagem: TypeScript.
- Módulos: ESM.
- Testes: Vitest.
- Gerenciador de pacotes: pnpm 12.15.0.
- Porta HTTP: variável `PORT`, com padrão `3002`; ver `.env.example`.
- Persistência: InMemory por padrão; TypeORM/PostgreSQL quando `DB_ENABLED=true`.
- Containers: PostgreSQL disponível por Docker Compose; as integrações TypeORM não foram exercitadas contra um banco real nesta etapa.

Consulte o [README](../README.md) para instalação, execução, endpoints e comandos de validação. As evidências de recursos externos, como Issues, branches, permissões e histórico, devem ser verificadas diretamente no GitHub.

## Rastreabilidade planejada

```mermaid
flowchart LR
    D[Decisões de domínio anteriores] --> UC[UC06, UC07 e UC04]
    UC --> S[Implementação incremental]
    S --> I[Issue de implementação]
    I --> B[Branch de trabalho]
    B -.-> C[Commits de implementação futuros]
    C -.-> PR[Pull Request futuro]
    PR -.-> R[Code Review futuro]
    R -.-> M[Integração futura na main]
```

As etapas pontilhadas são futuras. Um `push` publica commits na branch remota; não integra o trabalho à `main`, o que acontece após revisão e merge do Pull Request. O histórico, o estado da Issue e da branch e os links remotos precisam ser confirmados no GitHub, não inferidos deste diretório local.
