import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/material/IconButton";
import { useClearData } from "entities/dolphinData/publicApi";

const SignOut = () => {
  const clearFacebookData = useClearData();

  return (
    <IconButton color="inherit" onClick={clearFacebookData}>
      <LogoutOutlinedIcon />
    </IconButton>
  );
};

export default SignOut;
