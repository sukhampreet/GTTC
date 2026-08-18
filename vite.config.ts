import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    watch: {
      // backend/streams is where ffmpeg writes rolling HLS segments/playlists.
      // It sits inside this project root, so Vite's file watcher was picking
      // up every segment write and force-reloading the page.
      ignored: ['**/backend/streams/**'],
    },
  },
})