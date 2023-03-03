import LOCALES from "../constants/LOCALES";
import { TLocale } from "../typings/locales";

const KEY = "dolphin-locale";

export const getLocalLocale = async (): Promise<TLocale> => {
  const result = await chrome.storage.local.get([KEY]);
  let locale = LOCALES.RUSSIAN;

  if (result[KEY]) {
    locale = result[KEY];
  }

  return locale;
};

export const setLocalLocale = (value: TLocale) => {
  if (Object.values(LOCALES).includes(value)) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    });
  }
};
