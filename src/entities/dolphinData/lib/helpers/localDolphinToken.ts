const KEY = "dolphin-token";

export const getLocalDolphinToken = async (): Promise<string> => {
  const result = await chrome.storage.local.get([KEY]);
  let dolphinToken = "";

  if (result[KEY]) {
    dolphinToken = result[KEY];
  }

  return dolphinToken;
};

export const removeLocalDolphinToken = () => {
  chrome.storage.local.remove([KEY]).then(() => {
    // do nothing
  });
};

export const setLocalDolphinToken = (value: string) => {
  if (value) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    });
  }
};
