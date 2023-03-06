import axios from "axios";

import ERRORS from "../../lib/constants/ERRORS";
import extractDolphinTokenData from "../../lib/helpers/extractDolphinTokenData";
import {
  IResponseProfile,
  IStore as IDolphinProfileStore,
} from "../../lib/typings/dolphinProfile";
import { IStore as IDolphinTokenStore } from "../../lib/typings/dolphinToken";

const getProfileByDolphinToken = ({
  token,
  setProfile,
  setDolphinToken,
}: {
  token: string;
  setProfile: IDolphinProfileStore["setProfile"];
  setDolphinToken: IDolphinTokenStore["setDolphinToken"];
}) => {
  const dolphinTokenData = extractDolphinTokenData(token);

  if (!dolphinTokenData) {
    return Promise.reject(new Error(ERRORS.INVALID_TOKEN));
  }

  return axios<IResponseProfile>(`${dolphinTokenData.host}/profile`, {
    headers: { Authorization: dolphinTokenData.authorization },
  }).then(({ data: { success, data: profile } }) => {
    if (success) {
      setProfile(profile);
      setDolphinToken(token);
    } else {
      throw new Error(ERRORS.PROFILE_RESPONSE_NOT_SUCCESS);
    }
  });
};

export default getProfileByDolphinToken;
