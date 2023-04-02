import axios from "axios";

import ERRORS from "../../lib/constants/ERRORS";
import extractDolphinTokenData from "../../lib/helpers/extractDolphinTokenData";
import {
  IServerResponseProfile,
  ICloudResponseProfile,
  IProfile,
} from "../../lib/typings/dolphinProfile";

const getProfileByToken = (token: string): Promise<IProfile> => {
  const dolphinTokenData = extractDolphinTokenData(token);

  if (!dolphinTokenData) {
    return Promise.reject(new Error(ERRORS.INVALID_TOKEN));
  }

  if (dolphinTokenData.dolphinType === "cloud") {
    return axios<ICloudResponseProfile>(
      `${dolphinTokenData.host}/auth/profile`,
      { headers: { Authorization: dolphinTokenData.authorization } }
    ).then(({ data: { data: profile } }) => {
      return profile;
    });
  } else {
    return axios<IServerResponseProfile>(`${dolphinTokenData.host}/profile`, {
      headers: { Authorization: dolphinTokenData.authorization },
    }).then(({ data: { success, data: profile } }) => {
      if (success) {
        return {
          id: profile.id,
          username: profile.display_name || profile.login,
        };
      } else {
        throw new Error(ERRORS.PROFILE_RESPONSE_NOT_SUCCESS);
      }
    });
  }
};

export default getProfileByToken;
