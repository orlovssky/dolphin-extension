import MODES from "../constants/MODES";
import { TMode } from "../typings/theme";

const KEY = "dolphin-theme-mode";

export const getLocalThemeMode = (): Promise<TMode> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .get([KEY])
      .then((result) => {
        resolve(result[KEY]);
      })
      .catch(() => {
        reject(MODES.SYSTEM);
      });
  });
};

export const setLocalThemeMode = (value: TMode) => {
  if (Object.values(MODES).includes(value)) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    });
  }
};
