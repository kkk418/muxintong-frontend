import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/echarts')) return 'vendor-echarts'
          if (id.includes('node_modules/vue-router')) return 'vendor-router'
          if (id.includes('node_modules/pinia')) return 'vendor-pinia'
          if (id.includes('node_modules/vue')) return 'vendor-vue'
        },
      },
    },
  },
})
