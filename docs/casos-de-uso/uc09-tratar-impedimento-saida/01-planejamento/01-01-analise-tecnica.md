# UC09 - Tratar Impedimento de Saida: 01 01 Analise Tecnica

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Operador de Portaria. Objetivo: Tratar Impedimento de Saida. Fluxo: Validar decisao e persistir auditoria atomicamente com eventual fechamento/liberacao.

## Regras e alternativos
Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.

Erros: 400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
