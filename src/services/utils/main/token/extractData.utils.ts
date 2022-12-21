import { TExtractData } from "types/main/token.types";

export const extractData: TExtractData = (dolphinToken) => {
  try {
    const [baseURL, authorization] = window.atob(dolphinToken).split("::");

    if (baseURL && authorization) {
      return {
        host: baseURL,
        authorization,
      };
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};
