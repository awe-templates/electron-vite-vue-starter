import { defineConfig } from 'vite';
import { resolve } from 'path';
import { builtinModules } from 'module';

export default defineConfig({
  resolve: {
    alias: {
      '@main': resolve(__dirname, 'electron/main'),
      '@shared': resolve(__dirname, 'electron/shared'),
      '@preload': resolve(__dirname, 'electron/preload'),
      '@types': resolve(__dirname, 'types'),
    },
  },
  build: {
    outDir: 'dist/main',
    emptyOutDir: true,
    lib: {
      entry: {
        main: resolve(__dirname, 'electron/main/main.ts'),
        preload: resolve(__dirname, 'electron/preload/preload.ts'),
      },
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      external: (id) => {
        // Always externalize electron and built-in Node modules
        if (id === 'electron' || builtinModules.includes(id) || builtinModules.includes(id.replace('node:', ''))) {
          return true;
        }
        // Externalize @egoist/tipc/main only (bundle renderer for preload)
        if (id === '@egoist/tipc/main') {
          return true;
        }
        return false;
      },
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
  },
});
