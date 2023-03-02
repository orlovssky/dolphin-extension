// noinspection JSUnusedGlobalSymbols

import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

import manifest from "./src/builds/server/manifest";
import BUILD_OPTIONS from "./src/services/constants/app/buildOptions.constants";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      crx({ manifest }),
      createHtmlPlugin({
        minify: true,
        entry:
          env.BUILD_FOR === BUILD_OPTIONS.server
            ? "./src/builds/server/main"
            : "./src/builds/anty/main",
      }),
    ],
  };
});
