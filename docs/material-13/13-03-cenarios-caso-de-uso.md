# 13-03 - Cenários dos casos de uso

| Caso | Cenário criado | Esperado | Obtido |
|---|---|---|---|
| UC01 | Cadastro de Motorista/Veículo | `201` válido, `400` inválido | Collection versionada; validações derivadas do DTO |
| UC02 | Reserva sem dados obrigatórios | `400` | `400` no script |
| UC03 | Reserva inexistente | `404` | `404` no script |
| UC04 | Entrada sem placa | `400` | Collection versionada |
| UC05 | Checkout de permanência inexistente | `404` | Collection versionada |
| UC06 | Cadastro válido de Pátio/Vaga | `201` | `201` e `201` no script |
| UC07 | Tarifa sem dados | `400` | Collection versionada |
| UC08 | Categoria sem dados | `400` | Collection versionada |
| UC09 | Impedimento sem dados válidos | `400` | Collection versionada |
| UC10 | Indicadores da rede e pátio inexistente | `200` / `404` | Rede `200`; script |
