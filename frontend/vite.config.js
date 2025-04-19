import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/static/' : '/', // Base URL pour les fichiers générés
  build: {
    outDir: resolve(__dirname, '../static'), // Dossier de sortie pour les fichiers générés
    emptyOutDir: true, // Vide le dossier de sortie avant chaque build
    manifest: true, // <- ajoute ça ici
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.jsx'), // Point d'entrée principal
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js', // Nom des fichiers d'entrée
        chunkFileNames: 'assets/[name]-[hash].js', // Nom des fichiers de chunks
        assetFileNames: 'assets/[name]-[hash].[ext]', // Nom des fichiers d'assets
      },
    },
  },
  server: {
    port: 5173, // Port utilisé par le serveur de développement
    strictPort: true, // Arrête le serveur si le port est déjà utilisé
    cors: true, // Autorise les requêtes cross-origin
    proxy: {
      '/api': 'http://127.0.0.1:8000', // Proxy pour les requêtes API vers Django
    },
  },
});
