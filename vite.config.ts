/* eslint-disable @typescript-eslint/no-require-imports */
import react from "@vitejs/plugin-react-swc";

import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/globals.scss";
        `,
      },
    },
  },
});
