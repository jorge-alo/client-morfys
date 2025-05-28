import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html', // Asegura que el punto de entrada sea index.html
    },
  },
  base: '/', // Usa '/' en lugar de './' para producción en Vercel
  server: {
    host: true,
    historyApiFallback: true, // Habilita el fallback a index.html en desarrollo
  },
});