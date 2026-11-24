# Coleção REST Client do Vaga Fácil

Esta coleção contém requisições repetíveis para os casos UC01–UC10.

- `tests/`: smoke da API.
- `uc01` a `uc10`: cenários por caso de uso.
- `containerizado/`: smoke, cenários containerizados e `run-checks.sh`.

Os arquivos `.http` não fazem asserções. Compare o título `→ esperado` com o resultado obtido na extensão REST Client. A verificação automatizada está em `containerizado/run-checks.sh`.
