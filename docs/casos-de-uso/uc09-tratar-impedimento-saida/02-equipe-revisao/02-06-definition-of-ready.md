# UC09 - Tratar Impedimento de Saida: 02 06 Definition Of Ready

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**DoR-01 a DoR-07**

## DoR-01 a DoR-07
- DoR-01 objetivo/ator; DoR-02 fluxo principal e alternativos; DoR-03 regras; DoR-04 Dependencias; DoR-05 aceites observaveis; DoR-06 dados/limites; DoR-07 Assignee e Reviewer distintos.

## Revisao da equipe
Caso UC09: Tratar Impedimento de Saida. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.`, endpoint `POST /permanencias/:registroId/resolver-impedimento`, excecoes `400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.` e rastreabilidade `parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
