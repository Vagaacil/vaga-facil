# 13-06 - Script de verificação automatizada

Resultado normal obtido:

- `11 ok, 0 falha(s)`
- código de saída `0`.

Resultado com `--durability`:

- `13 ok, 0 falha(s)`
- código de saída `0`.
- O registro do Pátio continuou presente após reiniciar somente `api`.

Resultado com `BASE_URL=http://localhost:9`:

- `2 ok, 7 falha(s)`
- código de saída `1`.
- A execução detectou a ausência da API.

O script usa `set -u`, conta falhas e continua. Não usa `set -e`.
