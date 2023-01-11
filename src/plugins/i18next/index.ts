import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCALES } from "services/constants/app/locale.constants";

import cnTranslation from "./translations/cn.translations.json";
import enTranslation from "./translations/en.translations.json";
import ruTranslation from "./translations/ru.translations.json";

i18n
  .use(initReactI18next)
  .init({
    lng: LOCALES.RUSSIAN,
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
    // do nothing
  });
