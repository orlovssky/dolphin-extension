import psl from "psl";

const getUrlDomain = (url: string) => {
  const { host } = new URL(url);
  const parsed = psl.parse(host);

  if ("domain" in parsed) {
    return parsed.domain;
  }

  return null;
};

export default getUrlDomain;
