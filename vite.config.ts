import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'BytebankDesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `bytebank-wc.${format === 'umd' ? 'umd.js' : 'es.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    },
    outDir: 'dist',
    target: 'ES2020'
  },
  plugins: [
    dts({ insertTypesEntry: true }),
    {
      // Copy static assets (logo, favicon) into dist/assets so consumers
      // can import them directly from the published package.
      name: 'copy-assets',
      closeBundle() {
        mkdirSync('dist/assets', { recursive: true });
        copyFileSync('src/assets/logo.png',    'dist/assets/logo.png');
        copyFileSync('src/assets/favicon.png', 'dist/assets/favicon.png');
      },
    },
  ]
});
