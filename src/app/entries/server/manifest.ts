import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest(() => ({
  manifest_version: 3,
  name: "Dolphin x Server",
  description: "Поиск токена ФБ и быстрое добавление аккаунтов в твой Dolphin",
  version: "3.0.0",
  action: {
    default_popup: "index.html",
  },
  permissions: ["tabs", "scripting", "storage", "cookies"],
  host_permissions: ["https://*.facebook.com/*"],
  icons: {
    16: "static/mainIcons/16.png",
    48: "static/mainIcons/48.png",
    128: "static/mainIcons/128.png",
  },
}));
