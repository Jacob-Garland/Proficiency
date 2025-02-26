import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000',
    }
  },
  build: {
    outDir: path.resolve(__dirname, '../server/public/dist'),
    emptyOutDir: true,
  },
})
