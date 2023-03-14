const getAntyDolphinIntegrationToken = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyDolphinIntegrationToken((token) => {
      resolve(token);
    });
  });
};

export default getAntyDolphinIntegrationToken;
