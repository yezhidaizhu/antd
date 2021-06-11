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
      "@/views": path.resolve(__dirname, "./src/views"),
      "@/router": path.resolve(__dirname, "./src/router"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
})
