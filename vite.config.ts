import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      "@/layouts": path.resolve(__dirname, "./src/layouts"), // map '@' to './src' 
      "@/views": path.resolve(__dirname, "./src/views"), // map '@' to './src' 
      "@/router": path.resolve(__dirname, "./src/router"), // map '@' to './src' 
      "@/config": path.resolve(__dirname, "./src/config"), // map '@' to './src' 
      "@/components": path.resolve(__dirname, "./src/components"), // map '@' to './src' 
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
