import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { getCurrentTabInfo } from "services/utils/browser/tab.utils";
import { getUrlDomain } from "services/utils/browser/url.utils";

import InjectionResult = chrome.scripting.InjectionResult;

const FbTokenContext = createContext("");

const FbTokenProvider = ({ children }: { children: ReactNode }) => {
  const [fbToken, setFbToken] = useState("");

  useEffect(() => {
    getCurrentTabInfo().then((tab) => {
      if (!tab.id || !tab.url) return;

      if (!getUrlDomain(tab.url)?.includes("facebook")) return;

      const executeScriptCallback = (results: InjectionResult<string[]>[]) => {
        if (!Array.isArray(results) || !results.length) return;

        for (const string of results[0].result) {
          if (!string.includes("window.__accessToken")) continue;

          const matchedFbToken = string.match(/"EA[A-Za-z0-9]{20,}/gm);

          if (matchedFbToken) {
            setFbToken(matchedFbToken[0].substring(1));
            break;
          }
        }
      };

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () =>
            Array.from(document.getElementsByTagName("script")).map(
              (h) => h.innerHTML
            ),
        },
        executeScriptCallback
      );
    });
  }, []);

  return (
    <FbTokenContext.Provider value={fbToken}>
      {children}
    </FbTokenContext.Provider>
  );
};

export const useFbTokenContext = () => useContext(FbTokenContext);

export default FbTokenProvider;
