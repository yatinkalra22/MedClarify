import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest',
      generateBundle() {
        const manifestPath = path.resolve(__dirname, 'src/manifest.json');
        const manifest = fs.readFileSync(manifestPath, 'utf-8');
        this.emitFile({
          type: 'asset',
          fileName: 'manifest.json',
          source: manifest,
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/popup.html'),
        options: path.resolve(__dirname, 'src/options/options.html'),
        background: path.resolve(__dirname, 'src/background/background.ts'),
        'content-script': path.resolve(__dirname, 'src/content/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});

