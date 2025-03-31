import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
		cors: {
			origin: ['a6b7-54-163-48-7.ngrok-free.app', 'http://localhost:5173'],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['a6b7-54-163-48-7.ngrok-free.app'] //added this
	}
});
