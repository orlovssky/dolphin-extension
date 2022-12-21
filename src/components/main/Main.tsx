import StyledMain from "components/main/StyledMain";
import Account from "components/main/cards/account/Account";
import Dolphin from "components/main/cards/dolphin/Dolphin";
import FbToken from "components/main/cards/fbToken/FbToken";
import { useTokenContext } from "services/context/token.context";

const Main = () => {
  const tokenContext = useTokenContext();

  return (
    <StyledMain>
      {Boolean(tokenContext?.isConnected) && (
        <>
          <FbToken />
          <Account />
        </>
      )}

      <Dolphin />
    </StyledMain>
  );
};

export default Main;
