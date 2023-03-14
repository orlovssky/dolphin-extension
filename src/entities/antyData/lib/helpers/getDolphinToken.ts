const getDolphinToken = () => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyDolphinIntegrationToken((token) => {
      resolve(token);
    });
  });
};

export default getDolphinToken;
