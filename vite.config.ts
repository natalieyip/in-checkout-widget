import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'index.html'),        // for local dev
        widget: path.resolve(__dirname, 'src/index.tsx'),  // 👈 this makes it build
      },
      output: {
        entryFileNames: 'assets/widget.js', // optional: predictable output name
      },
    },
  },
})
