const getAntyProfileID = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyProfileID((id) => {
      resolve(id);
    });
  });
};

export default getAntyProfileID;
