# UC14 — Busca por Identificador

## Objetivo

Consultar uma única entidade já existente pelo seu identificador público, sem alterar dados.

## Recursos implementados

| UC        | Entidade                    | Rota                                                |
| --------- | --------------------------- | --------------------------------------------------- |
| UC01      | Motorista                   | `GET /motoristas/:motoristaId`                      |
| UC01      | Veículo                     | `GET /motoristas/:motoristaId/veiculos/:veiculoId`  |
| UC02/UC03 | Reserva                     | `GET /reservas/:reservaId`                          |
| UC04/UC05 | Permanência                 | `GET /permanencias/:registroId`                     |
| UC06      | Pátio                       | `GET /patios/:patioId`                              |
| UC06      | Vaga                        | `GET /patios/:patioId/vagas/:vagaId`                |
| UC07      | Tarifa                      | `GET /patios/:patioId/tarifas/:tarifaId`            |
| UC08      | Categoria                   | `GET /patios/:patioId/categorias-vaga/:categoriaId` |
| UC09      | Impedimentos da Permanência | `GET /permanencias/:registroId/impedimentos`        |

## Regras

- RN01: IDs públicos são UUIDs validados na fronteira HTTP.
- RN02: recurso inexistente retorna `404`.
- RN03: UUID malformado retorna `400`.
- RN04: a busca não altera dados.
- RN05: o DTO expõe apenas atributos públicos da entidade.
- RN06: falhas de persistência seguem o filtro HTTP existente.

## Critérios

- CA01: UUID válido existente retorna `200`.
- CA02: UUID válido inexistente retorna `404`.
- CA03: UUID inválido retorna `400` antes do Service.
- CA04: a busca não altera o estado persistido.
