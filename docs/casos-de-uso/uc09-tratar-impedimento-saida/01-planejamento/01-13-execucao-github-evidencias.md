# UC09 - Tratar Impedimento de Saida: 01 13 Execucao Github Evidencias

**Ator:** Operador de Portaria
**Endpoint:** `POST /permanencias/:registroId/resolver-impedimento`
**Evidencia remota aguardando GH CLI**

## EXECUCAO remota pendente
```powershell
gh label create feature --repo Vagaacil/vaga-facil --color 1D76DB --description "Caso de uso"
gh issue create --repo Vagaacil/vaga-facil --title "UC09: Tratar Impedimento de Saida" --body "Validar decisao e persistir auditoria atomicamente com eventual fechamento/liberacao." --label feature
gh project create --owner Vagaacil --title "Vaga Facil - Casos de Uso"
```

Script completo: `scripts/setup-github-issues.ps1` (labels, Epic, 10 issues, 50 sub-issues, Project/status e itens).

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]
Project/numero: [AGUARDANDO EXECUCAO VIA GH CLI]
Sub-issues: [AGUARDANDO EXECUCAO VIA GH CLI]

## Rastreabilidade local
src/modules/occupancy/entities/impedimento-saida.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: trilha e decisoes; test/app.e2e-spec.ts.
