const getAntyApiVersion = () => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyApiVersion((version) => {
      resolve(version);
    });
  });
};

export default getAntyApiVersion;
