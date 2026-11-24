# Evidências de completude UC01–UC10

Esta evidência registra a implementação e a verificação dos quatro requisitos adicionados ao fluxo didático.

## Persistência real

- Banco isolado: `postgres_test`, porta `5434`, banco `vaga_facil_test`.
- API isolada: `test-api`, porta `3003`.
- Teste: `test/postgresql.integration.e2e-spec.ts`.
- Resultado obtido: `2 testes aprovados`.
- Os testes comprovam persistência após reconexão do `DataSource`, persistência de Pátio, Vaga, Motorista e Veículo e o ciclo completo Reserva, Entrada, Tarifas, Saída e Impedimento.

## Concorrência transacional

- Pátio isolado com uma vaga para duas reservas concorrentes: `1 aprovada e 1 recusada`.
- Pátio isolado com uma vaga para duas entradas concorrentes: `1 aprovada e 1 recusada`.
- Conflitos são exercitados com `Promise.allSettled` sobre os repositórios reais de PostgreSQL.

## Seed de cenários

- Script: `scripts/seed-scenarios.sh`.
- Reinicia somente o banco isolado `postgres_test` antes do seed.
- Produz identificadores reais de Pátio, Vagas, Motorista, Veículos, Reserva e Permanência.
- Grava os IDs em `.tmp/seed-scenarios.json`.
- Não usa UUIDs fictícios nem altera o banco de desenvolvimento.

## Execução HTTP completa

- Script: `scripts/verify-http-complete.sh`.
- Resultado obtido: `15 ok, 0 falha(s)`.
- Cobre:
  - UC01 cadastro e conflito de veículo.
  - UC02 disponibilidade e reserva criada pelo seed.
  - UC03 cancelamento válido e repetido.
  - UC04 permanência criada e entrada repetida.
  - UC05 checkout válido e repetido.
  - UC06 duplicidade de vaga.
  - UC07 tarifa vigente.
  - UC08 categoria criada.
  - UC09 validação de impedimento.
  - UC10 indicadores da rede e do Pátio.

## Resultado consolidado final

- Vitest completo: `10 arquivos, 53 testes aprovados`.
- E2E HTTP: `8 testes aprovados`.
- Integração PostgreSQL: `2 testes aprovados`.
- HTTP completo sobre banco isolado: `15 verificações aprovadas, 0 falhas`.
- Lint: aprovado.
- Build: aprovado.

## Comandos

```bash
pnpm test:integration
pnpm test:seed
pnpm test:http
pnpm test
pnpm test:e2e
pnpm lint
pnpm build
```
