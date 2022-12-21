import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCAL_STORAGE } from "services/constants/app/localStorage.constants";
import { LOCALES } from "services/constants/app/locale.constants";

import cnTranslation from "./translations/cn.translations.json";
import enTranslation from "./translations/en.translations.json";
import ruTranslation from "./translations/ru.translations.json";

chrome.storage.local.get([LOCAL_STORAGE.LOCALE]).then((result) => {
  const storedLocale = result[LOCAL_STORAGE.LOCALE];

  i18n
    .use(initReactI18next)
    .init({
      lng: storedLocale || LOCALES.RUSSIAN,
      fallbackLng: LOCALES.RUSSIAN,
      interpolation: {
        escapeValue: false,
        skipOnVariables: false,
      },
      react: {
        useSuspense: false,
      },
      resources: {
        en: { translation: enTranslation },
        ru: { translation: ruTranslation },
        cn: { translation: cnTranslation },
      },
    })
    .then(() => {
      // do nothing.
    });
});
