# UC07 - Definir Tarifa Vigente: 02 01 Papeis Responsabilidades

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`
**Papeis e responsabilidades**

## Revisao da equipe
Caso UC07: Definir Tarifa Vigente. Participantes: Bruno Rocco Wolfardt, Felipe Sousa da Costa, Ian Fernandes Borges.

Revisar regra `Valor positivo, fracao 1-60min, tolerancia Nao negativa e tarifa por Patio/instante.`, endpoint `POST/GET /patios/:patioId/tarifas; GET tarifa-vigente`, excecoes `400 valor/duracao invalidos; 404 Patio; 409 tarifa inexistente.` e rastreabilidade `parking-operations.service.spec.ts: vigencia e tarifa ausente.`. Comentarios, aprovacoes e mudancas remotas so entram apos EXECUCAO real; Assignee Nao pode ser Reviewer.

## Rastreabilidade local
src/modules/occupancy/entities/tarifa-vigente.entity.ts; src/modules/occupancy/services/parking-operations.service.ts

**Vitest:** parking-operations.service.spec.ts: vigencia e tarifa ausente.
