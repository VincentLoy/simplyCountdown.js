import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/simplyCountdown.js'),
      name: 'simplyCountdown',
      fileName: (format) => `simplyCountdown.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        globals: {
          jquery: 'jQuery'
        }
      }
    }
  },
  server: {
    port: 3000,
    open: '/demo/index.html'
  }
});
