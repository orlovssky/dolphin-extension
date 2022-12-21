import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MuiTypography from "@mui/material/Typography";
import Tooltip from "components/app/bars/appBar/Tooltip";
import SettingsBar from "components/app/bars/settingsBar/SettingsBar";
import { useTranslation } from "react-i18next";
import { useTokenContext } from "services/context/token.context";

const AppBar = () => {
  const { t } = useTranslation();
  const tokenContext = useTokenContext();
  const getTitle = () => {
    if (tokenContext?.isConnected) {
      return <Tooltip username={tokenContext.data.username} />;
    }

    return (
      <MuiTypography variant="h6" component="h1" noWrap>
        {t("common.authorization")}
      </MuiTypography>
    );
  };

  return (
    <MuiAppBar enableColorOnDark>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: "space-between",
        }}
      >
        {getTitle()}
        <SettingsBar />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
