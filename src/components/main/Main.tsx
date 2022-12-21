import StyledMain from "components/main/StyledMain";
import Dolphin from "components/main/cards/dolphin/Dolphin";
import FbToken from "components/main/cards/fbToken/FbToken";
import { useTokenContext } from "services/context/token.context";

const Main = () => {
  const tokenContext = useTokenContext();
  const isConnected = tokenContext && Boolean(tokenContext.isConnected);

  return (
    <StyledMain>
      {isConnected && <FbToken />}
      <Dolphin />
    </StyledMain>
  );
};

export default Main;
