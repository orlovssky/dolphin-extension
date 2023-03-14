const KEY = "dolphin-token";

export const getLocalDolphinToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([KEY]).then((result) => {
      if (result[KEY]) {
        resolve(result[KEY]);
      } else {
        reject("No local dolphin token");
      }
    });
  });
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
