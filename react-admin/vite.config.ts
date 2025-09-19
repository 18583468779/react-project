import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true, // 改变源地址
        secure: false, // 不验证ssl证书
        rewrite: path => path.replace(/^\/api/, '') // 替换/api为''
      }
    }
  },
  plugins: [
    react(),
    viteMockServe({
      enable: true,
      localEnabled: true,
      mockPath: './src/mock',
      logger: true
      // 添加以下配置确保 Mock 服务器正确处理路径
    })
  ]
})
