# UC08 - Configurar Categorias de Vaga: 01 01 Analise Tecnica

**Ator:** Administrador do Estabelecimento
**Endpoint:** `POST/GET /patios/:patioId/categorias-vaga; PATCH vaga/categoria`
**Analise tecnica, fluxo e Diagnostico**

## Especificacao
Ator: Administrador do Estabelecimento. Objetivo: Configurar Categorias de Vaga. Fluxo: Cadastrar codigos e tipos compativeis; associar Vaga; validar antes de reservar.

## Regras e alternativos
RN06 compatibilidade configurada; Patio isolado; reclassificar somente Vaga Livre.

Erros: 400 payload; 404 categoria/vaga/patio; 409 incompatibilidade ou vaga indisponivel.

## Diagnostico do repositorio
Arquivos relevantes: src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts. InMemory foi exercitado; TypeORM compilou. PostgreSQL real Nao foi iniciado, portanto Nao se declara Evidencia de Integracao ao banco.

## Rastreabilidade local
src/modules/occupancy/entities/categoria-de-vaga.entity.ts; src/modules/occupancy/controllers/categorias-vaga.controller.ts; src/modules/orders/services/orders.service.ts

**Vitest:** reservation-workflows.service.spec.ts: Veiculo incompativel; test/app.e2e-spec.ts.
