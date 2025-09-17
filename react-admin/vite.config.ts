import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(
        __dirname,
        './src'
      )
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, // 改变源地址
        secure: false, // 不验证ssl证书
        rewrite: path =>
          path.replace(/^\/api/, '') // 替换/api为''
      }
    }
  },
  plugins: [react()]
})
