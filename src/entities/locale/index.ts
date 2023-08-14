export { default as LocaleToggle } from './ui/Toggle'

export { default as LOCALE } from './lib/constants/LOCALE'

export { default as localeLocalizations } from './lib/static/localizations'

export { getLocalLocale } from './lib/utils/localLocale'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LOCALE from './lib/constants/LOCALE'
import cnTranslation from './lib/static/translations/cn.json'
import enTranslation from './lib/static/translations/en.json'
import ruTranslation from './lib/static/translations/ru.json'

i18n
  .use(initReactI18next)
  .init({
    lng: LOCALE.ENGLISH,
    fallbackLng: LOCALE.ENGLISH,
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
    returnNull: false,
  })
  .then(() => {
    // do nothing
  })
