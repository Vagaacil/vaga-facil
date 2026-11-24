# UC05 - Concluir Saida: 01 13 Execucao Github Evidencias

**Ator:** Motorista
**Endpoint:** `POST /permanencias/:registroId/checkout`
**Evidencia remota aguardando GH CLI**

## EXECUCAO remota pendente
```powershell
gh label create feature --repo Vagaacil/vaga-facil --color 1D76DB --description "Caso de uso"
gh issue create --repo Vagaacil/vaga-facil --title "UC05: Concluir Saida" --body "Calcular valor na Ocupacao, cobrar via PaymentsService e fechar Registro/liberar Vaga em transacao apos aprovacao." --label feature
gh project create --owner Vagaacil --title "Vaga Facil - Casos de Uso"
```

Script completo: `scripts/setup-github-issues.ps1` (labels, Epic, 10 issues, 50 sub-issues, Project/status e itens).

Issue/URL: [AGUARDANDO EXECUCAO VIA GH CLI]
Project/numero: [AGUARDANDO EXECUCAO VIA GH CLI]
Sub-issues: [AGUARDANDO EXECUCAO VIA GH CLI]

## Rastreabilidade local
src/modules/occupancy/services/parking-operations.service.ts; src/modules/payments/services/payments.service.ts; src/modules/payments/entities/transacao-de-pagamento.entity.ts

**Vitest:** parking-operations.service.spec.ts: aprovacao, recusa, tarifa ausente e gateway; test/app.e2e-spec.ts.
