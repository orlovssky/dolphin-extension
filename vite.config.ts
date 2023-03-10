// noinspection JSUnusedGlobalSymbols

import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

import antyManifest from "./src/app/entries/anty/manifest";
import serverManifest from "./src/app/entries/server/manifest";

const manifest: { [key: string]: ManifestV3Export } = {
  server: serverManifest,
  anty: antyManifest,
};

export default defineConfig(({ mode }) => {
  const { BUILD_FOR } = loadEnv(mode, process.cwd(), "");
  const entry = `./src/app/entries/${BUILD_FOR}/main.tsx`;

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      crx({
        manifest: manifest[BUILD_FOR],
      }),
      createHtmlPlugin({
        entry,
        minify: true,
      }),
    ],
  };
});
