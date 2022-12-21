import { TExtractData } from "types/main/token.types";

export const extractData: TExtractData = (dolphinToken) => {
  try {
    const [baseURL, authorization] = window.atob(dolphinToken).split("::");

    if (!baseURL) {
      throw new Error("no baseURL");
    }

    if (!authorization) {
      throw new Error("no authorization");
    }

    return {
      host: baseURL,
      authorization,
    };
  } catch (_) {
    return null;
  }
};
