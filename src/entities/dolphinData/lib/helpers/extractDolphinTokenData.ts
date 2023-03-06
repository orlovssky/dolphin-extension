import { IDolphinTokenData } from "../typings/dolphinToken";

const extractDolphinTokenData = (token: string): IDolphinTokenData | null => {
  try {
    const [host, authorization] = window.atob(token).split("::");

    if (host && authorization) {
      return { host, authorization };
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};

export default extractDolphinTokenData;
