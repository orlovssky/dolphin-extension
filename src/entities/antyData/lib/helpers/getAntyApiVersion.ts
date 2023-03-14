const getAntyApiVersion = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyApiVersion((version) => {
      resolve(version);
    });
  });
};

export default getAntyApiVersion;
