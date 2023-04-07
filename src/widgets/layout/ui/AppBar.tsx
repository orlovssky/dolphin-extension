import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useDolphinProfileStore } from "entities/dolphinData";

import SettingsBar from "./SettingsBar";
import SignOut from "./SignOut";
import Title from "./Title";

const AppBar = () => {
  const profile = useDolphinProfileStore((state) => state.profile);

  return (
    <MuiAppBar elevation={0} enableColorOnDark>
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        {profile?.id && <SignOut />}
        <Title />
        <SettingsBar />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
