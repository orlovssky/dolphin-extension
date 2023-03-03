import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Locale from "entities/layout/locale/publicApi";
import Theme from "entities/layout/theme/publicApi";
import { useState } from "react";

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
            minWidth: 200,
          }}
        >
          <Box component="header" sx={{ width: "100%", mb: 3 }}>
            <IconButton sx={{ mr: 1 }} onClick={() => setIsOpened(false)}>
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Theme toggleButtonGroupProps={{ sx: { mb: 2 } }} />
          <Locale />
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsBar;
