import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    css: {
      devSourcemap: true
    },
    server: {
      port: 3000
    },
    define: {
      'import.meta.env.APP_MODE': JSON.stringify(mode)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
