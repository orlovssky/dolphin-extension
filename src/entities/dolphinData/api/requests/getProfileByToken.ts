import axios from "axios";

import ERRORS from "../../lib/constants/ERRORS";
import extractDolphinTokenData from "../../lib/helpers/extractDolphinTokenData";
import { IResponseProfile } from "../../lib/typings/dolphinProfile";

const getProfileByToken = (token: string) => {
  const dolphinTokenData = extractDolphinTokenData(token);

  if (!dolphinTokenData) {
    return Promise.reject(new Error(ERRORS.INVALID_TOKEN));
  }

  return axios<IResponseProfile>(`${dolphinTokenData.host}/profile`, {
    headers: { Authorization: dolphinTokenData.authorization },
  });
};

export default getProfileByToken;
