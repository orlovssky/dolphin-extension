import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SettingsBar from "components/app/bars/settingsBar/SettingsBar";
import { useTranslation } from "react-i18next";

const AppBar = () => {
  const { t } = useTranslation();

  return (
    <MuiAppBar enableColorOnDark>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="h1" noWrap>
          {`Dolphin {${t("common.extension")}}`}
          {`Dolphin {${t("common.extension")}}`}
          {`Dolphin {${t("common.extension")}}`}
          {`Dolphin {${t("common.extension")}}`}
          {`Dolphin {${t("common.extension")}}`}
          {`Dolphin {${t("common.extension")}}`}
        </Typography>

        <SettingsBar />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
