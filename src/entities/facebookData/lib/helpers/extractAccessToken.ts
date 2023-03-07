import psl from "psl";

import InjectionResult = chrome.scripting.InjectionResult;

const executeScriptFunc = () => {
  return Array.from(document.getElementsByTagName("script")).map(
    (scriptElement) => scriptElement.innerHTML
  );
};

const executeScript = (tabId: number): Promise<InjectionResult<string[]>[]> => {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      { target: { tabId }, func: executeScriptFunc },
      resolve
    );
  });
};

const getCurrentTabInfo = () => {
  return chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
};

const getUrlDomain = (url: string) => {
  const { host } = new URL(url);
  const parsed = psl.parse(host);

  if ("domain" in parsed) {
    return parsed.domain;
  }

  return null;
};

const findAccessToken = ([{ result }]: InjectionResult<
  string[]
>[]): Promise<string> => {
  for (const string of result) {
    if (!string.includes("window.__accessToken")) continue;

    const matchedFbToken = string.match(/"EA[A-Za-z0-9]{20,}/gm);

    if (matchedFbToken) {
      return Promise.resolve(matchedFbToken[0].substring(1));
    }
  }

  return Promise.reject("Access token not found");
};

const extractAccessToken = async (): Promise<string> => {
  const [tab] = await getCurrentTabInfo();

  if (!tab.id) {
    return Promise.reject("No tab id");
  }

  if (!tab.url) {
    return Promise.reject("No tab url");
  }

  if (!getUrlDomain(tab.url)?.includes("facebook")) {
    return Promise.reject("Not facebook url");
  }

  return findAccessToken(await executeScript(tab.id));
};

export default extractAccessToken;
