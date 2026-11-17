# UC09 - Tratar Impedimento de Saida: 06 01 Diagnostico Green

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Diagnostico GREEN**

## Refactor e Revisao
Caso: Tratar Impedimento de Saida.

- Regras preservadas: Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.
- Erros: 400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.
- Arquivos: src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts
- Testes: parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.

Build e ESLint dirigido passaram; Saida Vitest real em 06-04.

Integracao controlada exige reviewer diferente do assignee, CI aprovado e Issue/PR reais. TypeORM compilado, PostgreSQL runtime pendente.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
