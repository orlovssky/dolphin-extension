import { LOCALES } from "entities/layout/locale";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cn from "./translations/cn.json";
import en from "./translations/en.json";
import ru from "./translations/ru.json";

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
      en: { translation: en },
      ru: { translation: ru },
      cn: { translation: cn },
    },
    returnNull: false,
  })
  .then(() => {
    // do nothing
  });

export default i18n;
