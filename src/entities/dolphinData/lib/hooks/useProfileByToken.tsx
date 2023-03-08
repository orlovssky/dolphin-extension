import getProfileByToken from "../../api/requests/getProfileByToken";
import ERRORS from "../../lib/constants/ERRORS";
import {
  getLocalDolphinToken,
  setLocalDolphinToken,
  removeLocalDolphinToken,
} from "../../lib/helpers/localDolphinToken";
import useDolphinProfileStore from "../../model/store/useDolphinProfileStore";
import useDolphinTokenStore from "../../model/store/useDolphinTokenStore";

const useProfileByToken = () => {
  const setProfile = useDolphinProfileStore((state) => state.setProfile);
  const setDolphinToken = useDolphinTokenStore(
    (state) => state.setDolphinToken
  );

  return (token?: string) => {
    if (token === undefined) {
      return getLocalDolphinToken().then((dolphinToken) => {
        return getProfileByToken(dolphinToken)
          .then(({ data: { success, data: profile } }) => {
            if (success) {
              setProfile(profile);
              setDolphinToken(dolphinToken);
            } else {
              throw new Error(ERRORS.PROFILE_RESPONSE_NOT_SUCCESS);
            }
          })
          .catch((error) => {
            removeLocalDolphinToken();

            throw error;
          });
      });
    } else {
      return getProfileByToken(token).then(
        ({ data: { success, data: profile } }) => {
          if (success) {
            setProfile(profile);
            setDolphinToken(token);
            setLocalDolphinToken(token);
          } else {
            throw new Error(ERRORS.PROFILE_RESPONSE_NOT_SUCCESS);
          }
        }
      );
    }
  };
};

export default useProfileByToken;
