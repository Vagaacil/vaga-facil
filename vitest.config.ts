import ts from 'typescript';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'typescript-decorator-metadata',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.ts') || id.includes('node_modules')) {
          return null;
        }

        return ts.transpileModule(code, {
          fileName: id,
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2023,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            esModuleInterop: true,
            sourceMap: false,
          },
        }).outputText;
      },
    },
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
  },
});
