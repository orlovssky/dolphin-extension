import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/material/IconButton";
import {
  useDolphinProfileStore,
  useDolphinTokenStore,
  removeLocalDolphinToken,
} from "entities/dolphinData/publicApi";

const SignOut = () => {
  const clearProfile = useDolphinProfileStore((state) => state.clearProfile);
  const clearDolphinToken = useDolphinTokenStore(
    (state) => state.clearDolphinToken
  );
  const handleClick = () => {
    clearProfile();
    clearDolphinToken();
    removeLocalDolphinToken();
  };

  return (
    <IconButton color="inherit" onClick={handleClick}>
      <LogoutOutlinedIcon />
    </IconButton>
  );
};

export default SignOut;
