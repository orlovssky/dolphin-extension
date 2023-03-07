import axios from "axios";

import ERRORS from "../../lib/constants/ERRORS";
import extractDolphinTokenData from "../../lib/helpers/extractDolphinTokenData";
import { setLocalDolphinToken } from "../../lib/helpers/localDolphinToken";
import { IResponseProfile } from "../../lib/typings/dolphinProfile";
import useDolphinProfileStore from "../../model/store/useDolphinProfileStore";
import useDolphinTokenStore from "../../model/store/useDolphinTokenStore";

const useProfileByToken = () => {
  const setProfile = useDolphinProfileStore((state) => state.setProfile);
  const setDolphinToken = useDolphinTokenStore(
    (state) => state.setDolphinToken
  );

  return (token: string) => {
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
        setLocalDolphinToken(token);
      } else {
        throw new Error(ERRORS.PROFILE_RESPONSE_NOT_SUCCESS);
      }
    });
  };
};

export default useProfileByToken;
