import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { THEME_MODES } from "entities/layout/theme/publicApi";
import DolphinConnectionCard from "widgets/dolphinConnectionCard/publicApi";

const Server = () => {
  const { palette } = useTheme();

  return (
    <Box
      component="main"
      sx={{
        p: 2,
        ...(palette.mode === THEME_MODES.DARK && {
          color: palette.common.white,
          backgroundColor: palette.grey["900"],
        }),
        ...(palette.mode === THEME_MODES.LIGHT && {
          color: palette.common.black,
          backgroundColor: palette.grey["100"],
        }),
      }}
    >
      <DolphinConnectionCard />
    </Box>
  );
};

export default Server;
