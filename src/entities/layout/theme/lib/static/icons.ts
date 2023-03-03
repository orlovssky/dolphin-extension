import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

import MODES from "../constants/MODES";

export default {
  [MODES.LIGHT]: LightModeOutlinedIcon,
  [MODES.SYSTEM]: SettingsBrightnessIcon,
  [MODES.DARK]: DarkModeOutlinedIcon,
};
