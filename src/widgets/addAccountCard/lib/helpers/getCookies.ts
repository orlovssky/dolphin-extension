import { getUrlDomain, getCurrentTabInfo } from "shared/utils/chrome/publicApi";

export const getCookies = async () => {
  const [tab] = await getCurrentTabInfo();

  if (tab.url) {
    const domain = getUrlDomain(tab.url);

    if (domain) {
      return await chrome.cookies.getAll({
        domain,
      });
    }
  }

  return null;
};
