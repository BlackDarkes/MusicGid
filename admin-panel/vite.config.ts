import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
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
      "@/app": resolve(__dirname, "./src/app/"),
      "@/pages": resolve(__dirname, "./src/pages/"),
      "@/widgets": resolve(__dirname, "./src/widgets/"),
      "@/features": resolve(__dirname, "./src/features/"),
      "@/entities": resolve(__dirname, "./src/entities/"),
      "@/shared": resolve(__dirname, "./src/shared/"),
      "@/libs": resolve(__dirname, "./src/libs/"),
    },
  },
});
