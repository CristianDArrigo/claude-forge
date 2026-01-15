import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { resolve } from 'path';

// Vite configuration for Claude Forge Electron application
// Handles both main process and renderer process bundling
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        // Main process entry point
        entry: 'src/main/index.ts',
        vite: {
          build: {
            outDir: 'dist/main',
            rollupOptions: {
              external: ['electron', 'chokidar']
            }
          }
        }
      },
      {
        // Preload script for secure IPC communication
        entry: 'src/preload/index.ts',
        vite: {
          build: {
            outDir: 'dist/preload'
          }
        },
        onstart(options) {
          options.reload();
        }
      }
    ]),
    renderer()
  ],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared'),
      '@main': resolve(__dirname, 'src/main'),
      '@renderer': resolve(__dirname, 'src/renderer')
    }
  },
  build: {
    outDir: 'dist/renderer'
  }
});
