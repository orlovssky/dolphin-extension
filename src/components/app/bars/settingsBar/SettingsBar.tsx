import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Locale from "components/app/bars/settingsBar/Locale";
import ThemeMode from "components/app/bars/settingsBar/ThemeMode";
import { useState } from "react";
import { DRAWER_OPENED_WIDTH } from "services/constants/app/settingsBar.constants";

const SettingsBar = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <IconButton color="inherit" onClick={() => setIsOpened(true)}>
        <SettingsIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpened} onClose={() => setIsOpened(false)}>
        <Box
          component="aside"
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            minWidth: DRAWER_OPENED_WIDTH,
          }}
        >
          <ThemeMode />
          <Locale />
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsBar;
