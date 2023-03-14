import MODES from "../constants/MODES";
import { TMode } from "../typings/theme";

const KEY = "dolphin-theme-mode";

export const getLocalThemeMode = (): Promise<TMode> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([KEY]).then((result) => {
      if (result[KEY]) {
        resolve(result[KEY]);
      }
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
