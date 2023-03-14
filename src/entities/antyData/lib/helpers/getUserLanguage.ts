const getUserLanguage = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getUserLanguage((language) => {
      resolve(language);
    });
  });
};

export default getUserLanguage;
