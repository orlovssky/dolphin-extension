export default {
  manifest_version: 3,
  name: 'Dolphin',
  description: 'Поиск токена ФБ и быстрое добавление аккаунтов в твой Dolphin',
  version: '3.1.0',
  action: {
    default_popup: 'index.html',
  },
  permissions: ['tabs', 'scripting', 'storage', 'cookies'],
  host_permissions: ['https://*.facebook.com/*'],
  icons: {
    16: 'static/icons/16x16.png',
    48: 'static/icons/48x48.png',
    128: 'static/icons/128x128.png',
  },
}
