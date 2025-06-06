import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'index.html'),  
        widget: path.resolve(__dirname, './src/index.tsx'),
      },
      output: {
        entryFileNames: 'assets/widget.js', 
      },
    },
  },
})
