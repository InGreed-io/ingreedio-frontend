import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8081,
    strictPort: true,
  },
  server: {
    port: 8081,
    strictPort: true,
    host: true,
    origin: "http://127.0.0.1:8081",
  },
});
