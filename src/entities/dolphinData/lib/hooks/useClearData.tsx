import { removeLocalDolphinToken } from "../../lib/helpers/localDolphinToken";
import useDolphinProfileStore from "../../model/store/useDolphinProfileStore";
import useDolphinTokenStore from "../../model/store/useDolphinTokenStore";

const useClearData = () => {
  const clearProfile = useDolphinProfileStore((state) => state.clearProfile);
  const clearDolphinToken = useDolphinTokenStore(
    (state) => state.clearDolphinToken
  );

  return () => {
    clearProfile();
    clearDolphinToken();
    removeLocalDolphinToken();
  };
};

export default useClearData;
