const getAntyBaseUrl = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyBaseUrl((baseUrl) => {
      resolve(baseUrl);
    });
  });
};

export default getAntyBaseUrl;
