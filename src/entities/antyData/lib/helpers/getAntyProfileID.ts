const getAntyProfileID = () => {
  return new Promise((resolve) => {
    chrome.systemPrivate.getAntyProfileID((id) => {
      resolve(id);
    });
  });
};

export default getAntyProfileID;
