import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  optimizeDeps: {
    include: ["pdfjs-dist"],
  },
  build: {
    outDir: "dist",
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
