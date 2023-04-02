import { IDolphinTokenData } from "../typings/dolphinToken";

const extractDolphinTokenData = (token: string): IDolphinTokenData | null => {
  try {
    const decodedToken = window.atob(token);

    if (decodedToken.includes("::")) {
      const [host, authorization] = decodedToken.split("::");

      if (host && authorization) {
        return {
          host,
          authorization,
          dolphinType: "server",
        };
      }
    } else if (decodedToken.trim()) {
      return {
        host: "https://cloud.dolphin.tech/api/v1",
        authorization: `Bearer ${decodedToken.trim()}`,
        dolphinType: "cloud",
      };
    }

    return null;
  } catch (_) {
    return null;
  }
};

export default extractDolphinTokenData;
