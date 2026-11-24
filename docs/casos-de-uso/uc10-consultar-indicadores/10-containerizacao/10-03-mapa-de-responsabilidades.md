# UC10 - Consultar Indicadores de Ocupacao

## 10-3 - Mapa de responsabilidades

- Material: Containerizacao Docker Compose
- Base confirmada: /indicadores/ocupacao e /patios/:patioId/indicadores
- Estado: verificado contra o codigo e os artefatos existentes.

### Evidencia atual

- O contrato da rota foi localizado no controller e no material de execucao.
- Os testes Vitest existentes cobrem o fluxo ou registram explicitamente o comportamento pendente.
- O resultado deve ser confirmado pela execucao automatizada desta etapa.

### Decisoes preservadas

- Nao inventar requisitos ou endpoints inexistentes.
- Preservar o fluxo aprovado UC01–UC10.
- DTO, status HTTP, persistencia e resposta seguem o codigo real.
- Pendencias permanecem registradas como pendencias, nao como implementacao presumida.

### Proxima verificacao

Executar testes, lint, build e, quando aplicavel, o script REST Client/containerizado.
