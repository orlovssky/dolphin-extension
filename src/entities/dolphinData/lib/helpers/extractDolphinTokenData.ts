import { IDolphinTokenData } from "../typings/dolphinToken";

const extractDolphinTokenData = (token: string): IDolphinTokenData | null => {
  try {
    const decodedToken = window.atob(token);
    const [host, authorization, type] = decodedToken.split("::");

    if (host && authorization && type === "cloud") {
      return {
        host,
        authorization: `Bearer ${decodedToken.trim()}`,
        dolphinType: "cloud",
      };
    } else if (host && authorization) {
      return {
        host,
        authorization,
        dolphinType: "server",
      };
    }

    return null;
  } catch (_) {
    return null;
  }
};

export default extractDolphinTokenData;
