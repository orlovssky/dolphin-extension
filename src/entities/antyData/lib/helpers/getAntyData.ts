const getAntyData = () => {
  const data = {
    antyApiToken: "",
    antyApiVersion: "",
  };

  chrome.systemPrivate.getAntyApiToken((token) => {
    if (token) {
      data.antyApiToken = token;
    }
  });

  chrome.systemPrivate.getAntyApiVersion((version) => {
    if (version) {
      data.antyApiVersion = version;
    }
  });

  return data;
};

export default getAntyData;
