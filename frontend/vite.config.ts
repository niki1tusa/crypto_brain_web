import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '')
  return {plugins: [react()],
  server: {
    port: +env.PORT
  },
  preview: {
    port: +env.PORT
  }}
})
