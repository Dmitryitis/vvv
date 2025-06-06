import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: ['all'],
    hmr: {
      port: 5000,
      host: '0.0.0.0'
    },
    origin: `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  },
  define: {
    global: 'globalThis'
  }
})