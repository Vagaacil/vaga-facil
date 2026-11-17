# UC04 - Registrar Entrada: 01 13 Execucao Github Evidencias

**Ator:** Motorista via Ponto de Acesso
**Endpoint:** `POST /patios/:patioId/permanencias`
**Evidencia remota aguardando GH CLI**

## EXECUCAO remota pendente
```powershell
gh label create feature --repo Vagaacil/vaga-facil --color 1D76DB --description "Caso de uso"
gh issue create --repo Vagaacil/vaga-facil --title "UC04: Registrar Entrada" --body "Validar Placa/Patio, expirar holds, priorizar titular, alocar primeira livre e persistir Vaga + Registro atomicamente." --label feature
gh project create --owner Vagaacil --title "Vaga Facil - Casos de Uso"
```

Script completo: `scripts/setup-github-issues.ps1` (labels, Epic, 10 issues, 50 sub-issues, Project/status e itens).

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]
Project/numero: [AGUARDANDO EXECUCAO VIA GH CLI]
Sub-issues: [AGUARDANDO EXECUCAO VIA GH CLI]

## Rastreabilidade local
src/modules/occupancy/domain/placa.ts; src/modules/occupancy/services/registrar-entrada.handler.ts; src/modules/occupancy/repositories/typeorm-parking-operations.repository.ts

**Vitest:** parking-operations.service.spec.ts: normalizacao, duplicidade e lotacao; test/app.e2e-spec.ts.
