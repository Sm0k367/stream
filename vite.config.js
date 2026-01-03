import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  server: {
    port: 3000,
    open: true // Automatically opens the browser when you start
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Helps with debugging if something breaks
    minify: 'terser', // High-end code compression for faster loading
  }
});
