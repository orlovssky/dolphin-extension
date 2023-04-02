import getProfileByToken from "../../api/requests/getProfileByToken";
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
          .then((profile) => {
            setProfile(profile);
            setDolphinToken(dolphinToken);
          })
          .catch((error) => {
            removeLocalDolphinToken();

            throw error;
          });
      });
    } else {
      return getProfileByToken(token).then((profile) => {
        setProfile(profile);
        setDolphinToken(token);
        setLocalDolphinToken(token);
      });
    }
  };
};

export default useProfileByToken;
