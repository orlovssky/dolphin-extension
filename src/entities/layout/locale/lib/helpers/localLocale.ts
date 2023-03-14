import LOCALES from "../constants/LOCALES";
import { TLocale } from "../typings/locales";

const KEY = "dolphin-locale";

export const getLocalLocale = (): Promise<TLocale> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([KEY]).then((result) => {
      if (result[KEY]) {
        resolve(result[KEY]);
      }
    });
  });
};

export const setLocalLocale = (value: TLocale) => {
  if (Object.values(LOCALES).includes(value)) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    });
  }
};
