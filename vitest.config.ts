import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'tests/'],
    },
  },
  resolve: {
    alias: {
      '@main': resolve(__dirname, 'electron/main'),
      '@app': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'electron/shared'),
      '@preload': resolve(__dirname, 'electron/preload'),
    },
  },
});
