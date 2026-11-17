# Vaga Fácil

Backend da plataforma Vaga Fácil, um sistema para apoiar a gestão de estacionamentos: controle de vagas, entrada, permanência e saída de veículos, reservas e cobrança. A arquitetura planejada é um monólito modular, evoluído incrementalmente a partir de casos de uso.

## Estado atual

Este repositório contém a base técnica em NestJS 12, TypeScript e ESM com a implementação funcional dos casos de uso de confirmação de reserva e checkout de permanência. A aplicação expõe também o endpoint inicial `GET /`, além dos endpoints de domínio:

- `POST /orders/:reservationId/confirm`
- `POST /parking-stays/:parkingStayId/checkout`

O sistema está estruturado por módulos, serviços de aplicação, entidades, repositórios e testes automatizados. A persistência pode ser executada em memória ou com PostgreSQL quando `DB_ENABLED=true`.

| Área | Situação |
| --- | --- |
| Framework e linguagem | NestJS 12 e TypeScript configurados em ESM |
| Gerenciador de pacotes | pnpm 12.15.0, fixado em `package.json` |
| Testes | Vitest para testes unitários e e2e |
| Endpoints funcionais | `GET /`, `POST /orders/:reservationId/confirm`, `POST /parking-stays/:parkingStayId/checkout` |
| Banco de dados e persistência concreta | Suporte configurado para PostgreSQL via TypeORM e fallback em memória |
| Containers e migrações | Disponíveis por `docker-compose.yml` e configuração de ambiente |
| Primeiro slice de saída e tarifa | Implementado no serviço de ocupação e validado por testes |
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

## Endpoints principais

- `GET /` — retorno do scaffold inicial
- `POST /orders/:reservationId/confirm` — confirma uma reserva e retorna o status atualizado
- `POST /parking-stays/:parkingStayId/checkout` — encerra a permanência, calcula a tarifa e libera a vaga

## Persistência com PostgreSQL

A aplicação já está preparada para usar PostgreSQL via TypeORM quando a variável `DB_ENABLED=true` estiver definida. O arquivo `.env.example` contém as credenciais padrão e o projeto inclui um `docker-compose.yml` para subir uma instância local:

```bash
docker compose up -d postgres
```

Em seguida, configure o ambiente:

```bash
cp .env.example
DB_ENABLED=true
```

E execute a aplicação normalmente com `pnpm start:dev`.

## Testes e validações

```bash
pnpm test
pnpm test:e2e
pnpm build
pnpm lint
```

Os testes existentes cobrem o endpoint raiz, a confirmação de reservas e o checkout de permanência, incluindo cenários de erro para identidades inexistentes.

## Documentação

- [Visão geral do sistema e do primeiro slice](./docs/visao-geral.md)
- [Material 06 — Refatoração, revisão técnica e integração controlada](./docs/06-refatoracao-revisao-tecnica-e-integracao-controlada.md)
- [Material 07 — Da aplicação à API HTTP com NestJS](./docs/07-da-aplicacao-a-api-http-com-nestjs(1).md)
- [Material 08 — Verificação integrada do backend e preparação para persistência real](./docs/08-verificacao-integrada-do-backend-e-preparacao-para-persistencia-real.md)
- [Material 09 — Persistência real com PostgreSQL e TypeORM no NestJS](./docs/09-persistencia-real-com-postgresql-e-typeorm-no-nestjs.md)
- [Artefatos da etapa 06](./docs/etapa-06)
- [Artefatos da etapa 07](./docs/etapa-07)
- [Artefatos da etapa 08](./docs/etapa-08)
- [Artefatos da etapa 09](./docs/etapa-09)

O projeto inclui documentação do processo de refatoração, revisão técnica, entrega da fronteira HTTP com NestJS, validação integrada do backend e adoção da persistência real com PostgreSQL e TypeORM.
