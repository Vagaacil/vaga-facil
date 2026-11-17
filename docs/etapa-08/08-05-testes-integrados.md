# 08-05 — Testes integrados e evidência de armazenamento

## Arquivo criado
- [test/backend.integration.spec.ts](../../test/backend.integration.spec.ts)

## Objetivo
Garantir que a aplicação inteira, com módulos reais e repositórios em memória reais, execute o fluxo do backend sem mocks de componentes principais.

## Cenários testados
- resolução do provider do token do repositório;
- confirmação de reserva via HTTP real;
- checkout de permanência via HTTP real;
- falha de composição quando o repositório está ausente.

## Evidência
O processo foi validado com `pnpm test`, com todos os testes aprovados.
