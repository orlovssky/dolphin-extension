import { useTheme } from "@mui/material/styles";

import MODES from "../constants/MODES";

const backgroundMixin = () => {
  const { palette } = useTheme();

  return {
    ...(palette.mode === MODES.DARK && {
      color: palette.common.white,
      backgroundColor: palette.grey["900"],
    }),
    ...(palette.mode === MODES.LIGHT && {
      color: palette.common.black,
      backgroundColor: palette.grey["100"],
    }),
  };
};

export default backgroundMixin;
