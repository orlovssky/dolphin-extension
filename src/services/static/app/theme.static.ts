import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { THEME_MODES } from "services/constants/app/theme.constants";

export const themeModes = [
  THEME_MODES.LIGHT,
  THEME_MODES.SYSTEM,
  THEME_MODES.DARK,
];

export const icons = {
  [THEME_MODES.LIGHT]: LightModeIcon,
  [THEME_MODES.SYSTEM]: SettingsBrightnessIcon,
  [THEME_MODES.DARK]: DarkModeIcon,
};
