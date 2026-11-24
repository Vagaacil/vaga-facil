# Vaga Fácil

Backend da plataforma Vaga Fácil, um sistema para apoiar a gestão de estacionamentos: controle de vagas, entrada, permanência e saída de veículos, reservas e cobrança. A arquitetura planejada é um monólito modular, evoluído incrementalmente a partir de casos de uso.

## Estado atual

Este repositório contém os fluxos dos casos de uso UC01–UC10 em NestJS 12, TypeScript e ESM: cadastro de Motorista/Veículo, Pátio/Vaga, tarifa, entrada/saída, reservas, categorias, impedimentos e indicadores. Os comandos HTTP delegam aos serviços de aplicação; os repositórios InMemory são usados por padrão e os adaptadores TypeORM são selecionados quando `DB_ENABLED=true`. O checkout legado e a confirmação de reservas existentes foram preservados.

| Área                               | Situação                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| Framework e linguagem              | NestJS 12 e TypeScript configurados em ESM                                                 |
| Gerenciador de pacotes             | pnpm 12.15.0, fixado em `package.json`                                                     |
| Testes                             | Vitest para testes unitários e e2e                                                         |
| Validacao HTTP                     | DTOs com `class-validator` e `ValidationPipe` global (`whitelist` e `transform`)           |
| Endpoints                          | `GET /`, cadastro de Pátio/Vaga, tarifa, entrada, confirmação de reserva e checkout legado |
| Banco de dados                     | PostgreSQL via TypeORM quando `DB_ENABLED=true`                                            |
| Containers e migrações             | Docker Compose disponível; schema sincronizado pelo TypeORM fora de produção               |
| Checkout com pagamento obrigatório | Implementado em `POST /permanencias/:registroId/checkout`                                  |
| Porta HTTP                         | `PORT`, com padrão `3002`                                                                  |

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
- `POST /patios` — cadastra Pátio (`{ "nome": "Pátio Central" }`)
- `POST /patios/:patioId/vagas` — cadastra Vaga (`{ "codigo": "A-01" }`)
- `GET /patios/:patioId/vagas` — lista as Vagas do Pátio
- `GET /patios/:patioId` — UC14: busca um Pátio por identificador
- `GET /patios/:patioId/vagas/:vagaId` — UC14: busca uma Vaga por identificador
- `GET /motoristas/:motoristaId` — UC14: busca um Motorista por identificador
- `GET /motoristas/:motoristaId/veiculos/:veiculoId` — UC14: busca um Veículo por identificador
- `GET /reservas/:reservaId` — UC14: busca uma Reserva por identificador
- `GET /permanencias/:registroId` — UC14: busca uma Permanência por identificador
- `GET /patios?page=1&limit=20` — UC13: lista Pátios paginados e ordenados por nome
- `POST /patios/:patioId/tarifas` — define Tarifa Vigente (`{ "valorPorHora": 18 }`)
- `GET /patios/:patioId/tarifa-vigente` — consulta a tarifa aplicável
- `POST /patios/:patioId/permanencias` — registra entrada (`{ "placa": "ABC-1234" }`)
- `POST /permanencias/:registroId/checkout` — cobra a tarifa vigente e libera a vaga somente após aprovação
- `POST /permanencias/:registroId/resolver-impedimento` — registra decisão auditada de portaria
- `POST /motoristas` e `POST /motoristas/:motoristaId/veiculos` — cadastra Motorista e Veículo
- `POST /patios/:patioId/categorias-vaga` — configura categoria e compatibilidade
- `PATCH /patios/:patioId/vagas/:vagaId/categoria` — associa categoria à Vaga
- `POST /reservas` e `POST /reservas/:reservaId/cancelar` — reserva/cancela Vaga por 15 minutos
- `GET /indicadores/ocupacao` e `GET /patios/:patioId/indicadores` — consulta indicadores
- `POST /orders/:reservationId/confirm` — confirma uma reserva e retorna o status atualizado
- `POST /parking-stays/:parkingStayId/checkout` — checkout legado mantido para compatibilidade

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
pnpm test:integration
pnpm test:seed
pnpm test:http
pnpm build
pnpm lint
```

Os testes Vitest cobrem regras de aplicação, fronteira HTTP, persistência com PostgreSQL isolado e concorrência. A verificação final passou em 10 arquivos e 53 testes.

## Documentação

- [Visão geral do sistema e do primeiro slice](./docs/visao-geral.md)
- [Materiais 07 e 08 por caso de uso](./docs/casos-de-uso/)

As evidências de Issues, branches, Pull Requests e histórico devem ser confirmadas no GitHub. A URL de `origin` não comprova publicação das alterações locais.
