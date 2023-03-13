import { getUrlDomain, getCurrentTabInfo } from "shared/utils/chrome/publicApi";

import Cookie = chrome.cookies.Cookie;

export const getCookies = (): Promise<Cookie[] | null> => {
  return new Promise((resolve) => {
    getCurrentTabInfo().then(({ tabUrl }) => {
      const domain = getUrlDomain(tabUrl);

      if (domain) {
        chrome.cookies
          .getAll({ domain })
          .then((cookies) => {
            resolve(cookies);
          })
          .catch(() => {
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  });
};
