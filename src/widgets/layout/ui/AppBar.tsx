import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import SettingsBar from "./SettingsBar";

const AppBar = () => {
  const { t } = useTranslation();

  return (
    <MuiAppBar elevation={0} enableColorOnDark>
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="h1" noWrap>
          {t("common.authorization")}
        </Typography>

        <SettingsBar />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
