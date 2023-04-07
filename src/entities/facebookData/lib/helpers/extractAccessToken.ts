import { getCurrentTabInfo } from "shared/utils/chrome";

import InjectionResult = chrome.scripting.InjectionResult;

const executeScriptFunc = () => {
  return Array.from(document.getElementsByTagName("script")).map(
    (scriptElement) => scriptElement.innerHTML
  );
};

const executeScript = (tabId: number): Promise<InjectionResult<string[]>[]> => {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: executeScriptFunc,
      },
      resolve
    );
  });
};

const findAccessToken = ([{ result }]: InjectionResult<
  string[]
>[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    for (const string of result) {
      if (!string.includes("window.__accessToken")) {
        continue;
      }

      const matchedFbToken = string.match(/"EA[A-Za-z0-9]{20,}/gm);

      if (matchedFbToken) {
        resolve(matchedFbToken[0].substring(1));

        return;
      }
    }

    reject("Access token not found");
  });
};

const extractAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    getCurrentTabInfo().then(({ tabId }) => {
      executeScript(tabId).then((results) => {
        findAccessToken(results)
          .then((accessToken) => {
            resolve(accessToken);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  });
};

export default extractAccessToken;
