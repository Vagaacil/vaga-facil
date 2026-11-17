# UC07 - Definir Tarifa Vigente: 01 13 Execucao Github Evidencias

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Evidencia remota aguardando GH CLI**

## EXECUCAO remota pendente
```powershell
gh label create feature --repo Vagaacil/vaga-facil --color 1D76DB --description "Caso de uso"
gh issue create --repo Vagaacil/vaga-facil --title "UC07: Definir Tarifa Vigente" --body "Validar, salvar versao e buscar ultima tarifa vigente ate o instante do ClockPort." --label feature
gh project create --owner Vagaacil --title "Vaga Facil - Casos de Uso"
```

Script completo: `scripts/setup-github-issues.ps1` (labels, Epic, 10 issues, 50 sub-issues, Project/status e itens).

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]
Project/numero: [AGUARDANDO EXECUCAO VIA GH CLI]
Sub-issues: [AGUARDANDO EXECUCAO VIA GH CLI]

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
