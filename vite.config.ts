import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2022",
  },
  // root: path.resolve(__dirname, 'src'),
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
      {
        find: "~bootstrap",
        replacement: "./node_modules/bootstrap",
      },
    ],
  },
});
