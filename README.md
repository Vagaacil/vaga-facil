# Vaga Fácil

Backend da plataforma Vaga Fácil, um sistema para apoiar a gestão de estacionamentos: controle de vagas, entrada, permanência e saída de veículos, reservas e cobrança. A arquitetura planejada é um monólito modular, evoluído incrementalmente a partir de casos de uso.

## Estado atual

Este repositório ainda está em preparação para o primeiro slice de domínio. A aplicação NestJS inicial expõe apenas `GET /`, que retorna `Hello World!`. Há protótipos de domínio e serviço para confirmação de reservas, além de uma entidade de pagamento, mas eles ainda não estão conectados à aplicação, não têm implementação concreta de persistência e não correspondem ao primeiro slice selecionado.

O primeiro slice planejado é **registrar a saída de um veículo e calcular a tarifa**. O ator é o operador; o resultado esperado é encerrar a permanência, calcular a tarifa e liberar a vaga. A regra central identificada é a RN02, cujo cálculo pertence ao contexto de Ocupação e Acesso. Pagamentos, reservas, autenticação e administração ficam fora deste recorte.

| Área | Situação |
| --- | --- |
| Framework e linguagem | NestJS e TypeScript configurados |
| Gerenciador de pacotes | pnpm |
| Endpoint funcional | Somente `GET /` do scaffold NestJS |
| Banco de dados e persistência concreta | Ainda não configurados |
| Containers e migrações | Ainda não configurados |
| Primeiro slice de saída e tarifa | Planejado; ainda não implementado |
| Porta HTTP | `PORT`, com padrão `3002` |

## Requisitos

- Node.js compatível com a versão do NestJS instalada.
- pnpm.

## Instalação e execução

```bash
pnpm install
pnpm start:dev
```

Por padrão, a aplicação fica disponível em `http://localhost:3002`. Para usar outra porta, defina `PORT` no ambiente; `.env.example` documenta o valor padrão.

## Testes e validações

```bash
pnpm test
pnpm test:e2e
pnpm build
pnpm lint
```

Os testes existentes cobrem o endpoint raiz e o serviço de confirmação de reservas. Eles não validam o futuro fluxo de saída e cálculo de tarifa.

## Documentação

- [Visão geral do sistema e do primeiro slice](./docs/visao-geral.md)

Links, permissões, Issues, branches e histórico remoto devem corresponder a ações efetivamente realizadas; este README não os apresenta como verificados.
