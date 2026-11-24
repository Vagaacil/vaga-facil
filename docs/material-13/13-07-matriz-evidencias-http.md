# 13-07 - Matriz de evidências HTTP

| Nível | Ferramenta | Executado | Resultado |
|---|---|---|---|
| Manual | REST Client `.http` | Sim | Arquivos versionados para UC01–UC10 |
| HTTP real | `curl` / API Docker | Sim | Smoke, validações e cenários principais |
| Automatizado | `run-checks.sh` | Sim | `11 ok, 0 falha(s)` |
| Durabilidade | `run-checks.sh --durability` | Sim | `13 ok, 0 falha(s)` |
| Testes | Vitest | Sim | 9 arquivos, 48 testes |
| Persistência isolada | Script dedicado | Não | Nenhum script de integração isolado existe em `package.json` |
| E2E | `pnpm test:e2e` | Não | Não executado fora desta proteção; confirmar banco de destino |
