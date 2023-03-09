import psl from "psl";

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
