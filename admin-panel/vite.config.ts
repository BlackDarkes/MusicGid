/// <reference types="vitest" />
import { defineConfig, loadEnv, type UserConfig } from "vite";
import type { InlineConfig } from "vitest/node";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

interface IVitestConfigExport extends UserConfig {
  test?: InlineConfig
}

// https://vite.dev/config/
export default defineConfig(({ mode }): IVitestConfigExport => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
  };
});