# Vaga Fácil

Backend da plataforma Vaga Fácil, um sistema para apoiar a gestão de estacionamentos: controle de vagas, entrada, permanência e saída de veículos, reservas e cobrança. A arquitetura planejada é um monólito modular, evoluído incrementalmente a partir de casos de uso.

## Estado atual

Este repositório contém a base técnica em NestJS 12, TypeScript e ESM. A aplicação expõe apenas o endpoint inicial `GET /`, que retorna `Hello World!`. Há protótipos de domínio e serviço para confirmação de reservas, além de uma entidade de pagamento, mas eles ainda não estão conectados à aplicação, não têm implementação concreta de persistência e não correspondem ao primeiro slice selecionado.

O primeiro slice planejado é **registrar a saída de um veículo e calcular a tarifa**. O ator é o operador; o resultado esperado é encerrar a permanência, calcular a tarifa e liberar a vaga. A regra central identificada é a RN02, cujo cálculo pertence ao contexto de Ocupação e Acesso. Pagamentos, reservas, autenticação e administração ficam fora deste recorte. A implementação deste caso de uso não faz parte da preparação da base técnica.

| Área | Situação |
| --- | --- |
| Framework e linguagem | NestJS 12 e TypeScript configurados em ESM |
| Gerenciador de pacotes | pnpm 12.15.0, fixado em `package.json` |
| Testes | Vitest para testes unitários e e2e |
| Endpoint funcional | Somente `GET /` do scaffold NestJS |
| Banco de dados e persistência concreta | Ainda não configurados |
| Containers e migrações | Ainda não configurados |
| Primeiro slice de saída e tarifa | Planejado; ainda não implementado |
| Porta HTTP | `PORT`, com padrão `3002` |

## Requisitos

- Node.js 24 LTS.
- pnpm 12.15.0 (Corepack pode fornecer a versão fixada no `package.json`).

## Instalação e execução

```bash
pnpm install
pnpm start:dev
```

Por padrão, a aplicação fica disponível em `http://localhost:3002`. Para usar outra porta, defina `PORT` no ambiente; `.env.example` documenta o valor padrão. Se Node.js acabou de ser instalado no Windows e ainda não for reconhecido, reabra o terminal ou o VS Code para atualizar o ambiente. O arquivo [requests.http](./requests.http) contém a requisição para testar a rota inicial com uma extensão HTTP Client do VS Code.

## Testes e validações

```bash
pnpm test
pnpm test:e2e
pnpm build
pnpm lint
```

Os testes existentes cobrem o endpoint raiz e o protótipo de confirmação de reservas. Eles não validam o futuro fluxo de saída e cálculo de tarifa.

## Documentação

- [Visão geral do sistema e do primeiro slice](./docs/visao-geral.md)
- [Relatório da base técnica NestJS 12 e planejamento do primeiro slice](./docs/base-tecnica-vaga-facil.md)

O relatório registra as versões e verificações executadas, as responsabilidades arquiteturais planejadas e as decisões ainda pendentes. A URL de `origin` está configurada para `https://github.com/Vagaacil/vaga-facil.git`; isso não comprova publicação das alterações locais.
