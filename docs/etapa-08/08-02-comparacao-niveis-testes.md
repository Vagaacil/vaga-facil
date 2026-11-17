# 08-02 — Comparação dos níveis de testes

## Nível A — Unitário do Service
Utiliza service real + repositório mockado.

**Verifica:** regra de negócio isolada.

**Limitação:** não valida controller, rota HTTP, DTO e injeção de dependência do módulo.

## Nível B — HTTP com Service Simulado
Utiliza controller real + ValidationPipe + mock do service.

**Verifica:** camada HTTP, status, roteamento e delegação.

**Limitação:** não exercita o service real nem o repositório em memória real.

## Nível C — Integrado do Backend
Utiliza módulo real + controller + service + repositório em memória real + supertest.

**Verifica:** fluxo completo de execução real do backend.

**Conclusão:** o teste HTTP com service simulado não substitui o teste integrado com service e repository reais.
