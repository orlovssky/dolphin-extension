// noinspection JSUnusedGlobalSymbols

import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const { BUILD_FOR } = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      crx({
        manifest: import(`./src/app/${BUILD_FOR}/manifest.ts`),
      }),
      createHtmlPlugin({
        minify: true,
        entry: `./src/app/${BUILD_FOR}/main.tsx`,
      }),
    ],
  };
});
