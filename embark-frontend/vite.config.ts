import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Remove console statements in production builds
    // This will drop all console.log, console.error, console.warn, etc.
    // during the build process, keeping the code clean in production
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
})
