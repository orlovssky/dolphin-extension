import Account from "components/main/cards/account/Account";
import Dolphin from "components/main/cards/dolphin/Dolphin";
import FbToken from "components/main/cards/fbToken/FbToken";
import StyledMain from "components/main/StyledMain";
import { useFbTokenContext } from "services/context/fbToken.context";
import { useTokenContext } from "services/context/token.context";

const Main = () => {
  const tokenContext = useTokenContext();
  const fbToken = useFbTokenContext();

  return (
    <StyledMain>
      {Boolean(tokenContext?.isConnected) && (
        <>
          <FbToken />
          {Boolean(fbToken) && <Account />}
        </>
      )}

      <Dolphin />
    </StyledMain>
  );
};

export default Main;
