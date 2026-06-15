import { defineConfig } from "electron-vite";

export default defineConfig({
  main: {
    build: {
      outDir: "dist-electron/main",
    },
  },
});
