# UC09 - Tratar Impedimento de Saida: 02 08 Checklist Consistencia

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Checklist de equipe**

## Revisao da equipe
Caso UC09: Tratar Impedimento de Saida. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Justificativa e operador obrigatorios; LIBERAR fecha/libera; MANTER mantem aberto/ocupado; auditoria para ambas.`, endpoint `POST /permanencias/:registroId/resolver-impedimento`, excecoes `400 decisao/campos; 404 permanencia; 409 ja fechada; 503 infraestrutura.` e rastreabilidade `parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
