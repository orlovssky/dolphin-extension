const getCurrentTabInfo = () => {
  return chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
};

export default getCurrentTabInfo;
