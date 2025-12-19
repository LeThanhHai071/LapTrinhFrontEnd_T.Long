import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Cho phép Vite phục vụ các file từ thư mục node_modules và thư mục gốc dự án
      allow: ['..'] 
    }
  }
})
