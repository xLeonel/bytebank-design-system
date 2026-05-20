import { defineConfig } from 'vite';
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
  plugins: [dts({ insertTypesEntry: true })]
});
