import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hbd-landing/',
  server: {
    open: true,
    port: 3006
  }
});
