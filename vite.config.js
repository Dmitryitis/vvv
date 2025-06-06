import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      port: 5000,
      host: '0.0.0.0'
    }
  },
  define: {
    global: 'globalThis'
  }
})