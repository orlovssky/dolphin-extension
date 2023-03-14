const getAntyApiToken = () => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyApiToken((token) => {
      resolve(token);
    });
  });
};

export default getAntyApiToken;
