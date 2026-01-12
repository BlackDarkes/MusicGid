import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    port: 8080,
    open: true,
    hmr: true,
    cors: true,
  },
  preview: { port: 8080 },
  resolve: {
    alias: {
      "@/app/": "./src/app/",
      "@/pages/": "./src/pages/",
      "@/widgets/": "./src/widgets/",
      "@/features/": "./src/features/",
      "@/entities/": "./src/entities/",
      "@/shared/": "./src/shared/",
      "@/libs/": "./src/libs/",
    }
  }
})
