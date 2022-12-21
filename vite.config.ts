// noinspection JSUnusedGlobalSymbols

import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

const manifest = {
  manifest_version: 3,
  name: "Dolphin",
  description: "Поиск токена ФБ и быстрое добавление аккаунтов в твой Dolphin",
  version: "3.0.0",
  action: {
    default_popup: "index.html",
  },
  permissions: ["storage"],
  // "host_permissions": [ "https://*.facebook.com/*" ],
  // "storage": {
  //   "managed_schema": "schema.json"
  // },
  icons: {
    "16": "assets/icons/main16.png",
    "48": "assets/icons/main48.png",
    "128": "assets/icons/main128.png",
  },
};

export default defineConfig({
  plugins: [react(), tsconfigPaths(), crx({ manifest })],
});
