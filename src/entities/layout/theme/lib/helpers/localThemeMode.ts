import MODES from "../constants/MODES";
import { TMode } from "../typings/theme";

const KEY = "dolphin-theme-mode";

export const getLocalThemeMode = async (): Promise<TMode> => {
  const result = await chrome.storage.local.get([KEY]);
  let mode = MODES.SYSTEM;

  if (result[KEY]) {
    mode = result[KEY];
  }

  return mode;
};

export const setLocalThemeMode = (value: TMode) => {
  if (Object.values(MODES).includes(value)) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    });
  }
};
