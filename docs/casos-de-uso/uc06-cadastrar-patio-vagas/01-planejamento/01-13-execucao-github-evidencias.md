# UC06 - Cadastrar Patio e Vagas: 01 13 Execucao Github Evidencias

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST /patios; POST/GET /patios/:patioId/vagas`
**Evidencia remota aguardando GH CLI**

## EXECUCAO remota pendente
```powershell
gh label create feature --repo Vagaacil/vaga-facil --color 1D76DB --description "Caso de uso"
gh issue create --repo Vagaacil/vaga-facil --title "UC06: Cadastrar Patio e Vagas" --body "Cadastrar Patio, Vagas e consultar por Patio sem compartilhar Ocupacao." --label feature
gh project create --owner Vagaacil --title "Vaga Facil - Casos de Uso"
```

Script completo: `scripts/setup-github-issues.ps1` (labels, Epic, 10 issues, 50 sub-issues, Project/status e itens).

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]
Project/numero: [AGUARDANDO EXECUCAO VIA GH CLI]
Sub-issues: [AGUARDANDO EXECUCAO VIA GH CLI]

## Rastreabilidade local
src/modules/occupancy/entities/patio.entity.ts; src/modules/occupancy/entities/vaga.entity.ts; src/modules/occupancy/controllers/patios.controller.ts

**Vitest:** parking-operations.service.spec.ts: cadastro; test/app.e2e-spec.ts.
