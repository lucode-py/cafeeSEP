import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Ceci force l’injection manuelle si auto-injection foire
      jsxImportSource: 'react',
      babel: {
        plugins: [],
      },
      fastRefresh: false, // temporairement désactivé (optionnel)
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  build: {
    outDir: '../static',
    emptyOutDir: true,
  },
})
