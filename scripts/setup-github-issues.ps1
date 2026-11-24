$ErrorActionPreference = 'Stop'

$repository = 'Vagaacil/vaga-facil'
$projectOwner = 'Vagaacil'
$projectTitle = 'Vaga Fácil - Casos de Uso'
$labels = @(
  @{ Name = 'epic'; Color = '5319E7'; Description = 'Épico que agrupa um caso de uso' },
  @{ Name = 'feature'; Color = '1D76DB'; Description = 'Entrega funcional de caso de uso' },
  @{ Name = 'subtask'; Color = '0E8A16'; Description = 'Unidade técnica de trabalho' },
  @{ Name = 'documentation'; Color = '0075CA'; Description = 'Documentação metodológica' },
  @{ Name = 'test'; Color = 'FBCA04'; Description = 'Testes automatizados Vitest' },
  @{ Name = 'persistence'; Color = 'D93F0B'; Description = 'Persistência InMemory e TypeORM' },
  @{ Name = 'api'; Color = 'C2E0C6'; Description = 'Contrato e endpoint HTTP' },
  @{ Name = 'domain'; Color = 'BFD4F2'; Description = 'Regra e modelo de domínio' }
)

$cases = @(
  @{ Id = 'UC01'; Title = 'Cadastrar Conta e Veículo'; Description = 'Cadastrar Motorista, validar dados e associar Veículo com Placa única.' },
  @{ Id = 'UC02'; Title = 'Reservar Vaga'; Description = 'Reservar Vaga disponível da categoria compatível para Motorista e Veículo cadastrados; reter por 15 minutos.' },
  @{ Id = 'UC03'; Title = 'Cancelar Reserva'; Description = 'Cancelar Reserva ativa e liberar a retenção correspondente da Vaga.' },
  @{ Id = 'UC04'; Title = 'Registrar Entrada'; Description = 'Validar Placa, impedir permanência duplicada e ocupar Vaga livre ou reservada pelo titular.' },
  @{ Id = 'UC05'; Title = 'Concluir Saída'; Description = 'Calcular com Tarifa Vigente, processar pagamento e liberar Vaga somente após aprovação.' },
  @{ Id = 'UC06'; Title = 'Cadastrar Pátio e Vagas'; Description = 'Cadastrar Pátio independente e Vagas iniciadas como Livres.' },
  @{ Id = 'UC07'; Title = 'Definir Tarifa Vigente'; Description = 'Definir e consultar valor, fração, tolerância e início de vigência por Pátio.' },
  @{ Id = 'UC08'; Title = 'Configurar Categorias de Vaga'; Description = 'Configurar categorias, compatibilidade com Veículo e associação a Vagas.' },
  @{ Id = 'UC09'; Title = 'Tratar Impedimento de Saída'; Description = 'Registrar justificativa e decisão do Operador, preservando trilha de auditoria.' },
  @{ Id = 'UC10'; Title = 'Consultar Indicadores de Ocupação'; Description = 'Consultar totais, estados, taxa de ocupação e duração média de permanência.' }
)

$subtaskTitles = @(
  'Definir modelo e invariantes do domínio',
  'Implementar portas e adaptadores de persistência',
  'Expor comandos e contratos HTTP',
  'Cobrir cenários de sucesso, falha e concorrência com Vitest',
  'Atualizar documentação e evidências de integração'
)

function Invoke-Gh {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)
  $output = & gh @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Comando gh falhou ($LASTEXITCODE): gh $($Arguments -join ' ')"
  }
  return $output
}

foreach ($label in $labels) {
  Invoke-Gh @(
    'label', 'create', $label.Name,
    '--repo', $repository,
    '--color', $label.Color,
    '--description', $label.Description,
    '--force'
  ) | Out-Null
}

$createdIssueUrls = [System.Collections.Generic.List[string]]::new()
$epicBody = @'
## Objetivo
Implementar os dez casos de uso do Vaga Fácil, com rastreabilidade entre domínio, HTTP, persistência, testes e documentação.

## Critérios de aceite
- Os UC01 a UC10 têm implementação e testes Vitest.
- A persistência InMemory e TypeORM segue as mesmas invariantes.
- Os Materiais 01 a 06 registram decisões e evidências reais.
- Nenhum hash, Issue ou Pull Request é registrado sem confirmação remota.
'@
$epicOutput = Invoke-Gh @(
  'issue', 'create', '--repo', $repository,
  '--title', 'EPIC: Implementar os casos de uso UC01–UC10',
  '--body', $epicBody,
  '--label', 'epic'
)
$epicUrl = ($epicOutput | Select-Object -Last 1).Trim()
if ($epicUrl -notmatch '/issues/(\d+)$') {
  throw "Não foi possível interpretar a URL real da Epic: $epicUrl"
}
$epicNumber = $Matches[1]
$createdIssueUrls.Add($epicUrl)

foreach ($case in $cases) {
  $caseBody = @"
## Caso de uso
$($case.Id) — $($case.Title)

## Escopo
$($case.Description)

## Critérios de aceite
- Fluxo feliz e impedimentos relevantes estão cobertos por Vitest.
- A regra permanece no contexto de domínio responsável.
- Contrato HTTP e persistência refletem o estado real da implementação.

## Responsabilidade
Definir Assignee e Reviewer entre Bruno Rocco Wolfardt, Felipe Sousa da Costa e Ian Fernandes Borges, sempre com pessoas diferentes.
"@
  $caseOutput = Invoke-Gh @(
    'issue', 'create', '--repo', $repository,
    '--title', "$($case.Id): $($case.Title)",
    '--body', $caseBody,
    '--label', 'feature',
    '--parent', $epicNumber
  )
  $caseUrl = ($caseOutput | Select-Object -Last 1).Trim()
  if ($caseUrl -notmatch '/issues/(\d+)$') {
    throw "Não foi possível interpretar a URL real da Issue $($case.Id): $caseUrl"
  }
  $caseNumber = $Matches[1]
  $createdIssueUrls.Add($caseUrl)

  for ($index = 0; $index -lt $subtaskTitles.Count; $index += 1) {
    $subNumber = '{0:D2}' -f ($index + 1)
    $subBody = @"
## Sub-issue SUB-$subNumber
Caso: $($case.Id) — $($case.Title)

## Trabalho
$($subtaskTitles[$index])

## Critérios de aceite
- Alteração tecnicamente coesa e sem divisão artificial de RED/GREEN.
- Casos Vitest correspondentes passam.
- Erros de domínio não são convertidos em sucesso silencioso.

## Revisão cruzada
Selecionar um Assignee e um Reviewer diferentes entre os três integrantes reais da equipe.
"@
    $subOutput = Invoke-Gh @(
      'issue', 'create', '--repo', $repository,
      '--title', "$($case.Id) SUB-$subNumber — $($subtaskTitles[$index])",
      '--body', $subBody,
      '--label', 'subtask',
      '--parent', $caseNumber
    )
    $subUrl = ($subOutput | Select-Object -Last 1).Trim()
    if ($subUrl -notmatch '/issues/(\d+)$') {
      throw "Não foi possível interpretar a URL da sub-issue $($case.Id) SUB-$subNumber`: $subUrl"
    }
    $createdIssueUrls.Add($subUrl)
  }
}

$projectOutput = Invoke-Gh @(
  'project', 'create',
  '--owner', $projectOwner,
  '--title', $projectTitle,
  '--format', 'json'
) | ConvertFrom-Json
$projectNumber = [string]$projectOutput.number
if (-not $projectNumber) {
  throw 'O comando gh project create não retornou o número do Project.'
}

Invoke-Gh @(
  'project', 'field-create', $projectNumber,
  '--owner', $projectOwner,
  '--name', 'Status de Trabalho',
  '--data-type', 'SINGLE_SELECT',
  '--single-select-options', 'Backlog,Ready,In Progress,In Review,Done'
) | Out-Null

foreach ($issueUrl in $createdIssueUrls) {
  Invoke-Gh @(
    'project', 'item-add', $projectNumber,
    '--owner', $projectOwner,
    '--url', $issueUrl
  ) | Out-Null
}

Write-Host "Epic: $epicUrl"
Write-Host "Project: $($projectOutput.url)"
Write-Host "Issues criadas: $($createdIssueUrls.Count)"
