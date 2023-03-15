import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  // optimizeDeps:{
  //   include:[]
  // },
  server: {
    port: 5050,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '')
      }
    }
  }
})
