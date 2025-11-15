import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/main/setup.ts', './tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'tests/'],
    },
    // @ts-expect-error - environmentMatchGlobs is a valid vitest config option
    environmentMatchGlobs: [['tests/main/**', 'node']],
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
