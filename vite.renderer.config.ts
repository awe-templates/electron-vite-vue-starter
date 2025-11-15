import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'electron/shared'),
      '@types': resolve(__dirname, 'types'),
    },
  },
  root: resolve(__dirname, 'src'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'),
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
