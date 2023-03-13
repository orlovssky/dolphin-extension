import getUrlDomain from "./getUrlDomain";

const getCurrentTabInfo = (): Promise<{ tabId: number; tabUrl: string }> => {
  return new Promise((resolve, reject) => {
    chrome.tabs
      .query({
        active: true,
        currentWindow: true,
      })
      .then(([tab]) => {
        if (!tab) {
          reject("No tab");

          return;
        }

        if (!tab.url) {
          reject("No tab url");

          return;
        } else if (!getUrlDomain(tab.url)?.includes("facebook")) {
          reject("Not facebook url");

          return;
        }

        if (!tab.id) {
          reject("No tab id");

          return;
        }

        resolve({
          tabId: tab.id,
          tabUrl: tab.url,
        });
      });
  });
};

export default getCurrentTabInfo;
