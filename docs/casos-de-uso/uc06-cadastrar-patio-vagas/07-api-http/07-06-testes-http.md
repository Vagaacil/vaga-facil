# UC06 - Testes HTTP

**Caso:** UC06 - Cadastrar Patio e Vagas
**Ator:** Administrador do Estabelecimento
**Rotas:** `POST /patios; POST/GET /patios/:patioId/vagas`

## Test file and scenarios
Boundary suite: [test/http-boundary.e2e-spec.ts](../../../../test/http-boundary.e2e-spec.ts) (Vitest, `@nestjs/testing`, Supertest, `vi.fn()` service doubles).

For this case: Patio/spot registration and listing; free-state and uniqueness invariants remain in the domain/repository.

The boundary tests assert delegation and valid response; invalid DTO payloads return 400 before the mocked application service is called. Full implemented code is in the linked source file.

## Real executions
```text
Baseline: corepack pnpm test - 6 files, 31 tests passed (15:01:51).
Current: corepack pnpm test - 8 files, 45 tests passed (15:17:31).
Targeted: HTTP boundary 12/12; AppModule integrated E2E 7/7;
DI diagnostic 1/1; prior Service tests 21/21.
Build: corepack pnpm build - passed.
Lint: corepack pnpm exec eslint "src/**/*.ts" "test/**/*.ts" vitest.config.ts - passed.
```

The separate integrated suite uses the real module and is not a substitute for boundary delegation tests; SQL integration remains untested.
