import { getCurrentTabInfo } from "services/utils/browser/tab.utils";
import { getUrlDomain } from "services/utils/browser/url.utils";

export const getCookies = async () => {
  const tab = await getCurrentTabInfo();

  if (tab.url) {
    const domain = getUrlDomain(tab.url);

    if (domain) {
      return await chrome.cookies.getAll({ domain });
    }
  }

  return null;
};
