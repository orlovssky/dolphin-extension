import extractDolphinTokenData from "../../lib/helpers/extractDolphinTokenData";
import useDolphinTokenStore from "../../model/store/useDolphinTokenStore";

const useDolphinTokenData = () => {
  const dolphinToken = useDolphinTokenStore((state) => state.dolphinToken);

  return extractDolphinTokenData(dolphinToken);
};

export default useDolphinTokenData;
