import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Set this if deploying to subpath
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})