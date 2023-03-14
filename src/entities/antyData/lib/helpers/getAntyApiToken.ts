const getAntyApiToken = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyApiToken((token) => {
      resolve(token);
    });
  });
};

export default getAntyApiToken;
