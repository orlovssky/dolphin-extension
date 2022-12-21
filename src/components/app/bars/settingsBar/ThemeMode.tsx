import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useTranslation } from "react-i18next";
import { MouseEvent, createElement } from "react";
import { LOCAL_STORAGE } from "services/constants/app/localStorage.constants";
import { THEME_MODES } from "services/constants/app/theme.constants";
import { useThemeContext } from "services/context/theme.context";
import { icons, themeModes } from "services/static/app/theme.static";

const ThemeMode = () => {
  const { t } = useTranslation();
  const themeContext = useThemeContext();
  const handleChange = (event: MouseEvent<HTMLElement>, value: THEME_MODES) => {
    if (!themeContext) return;
    if (!value || value === themeContext.mode) return;

    chrome.storage.local.set({ [LOCAL_STORAGE.THEME_MODE]: value }).then(() => {
      themeContext.setMode(value);
    });
  };

  return (
    <ToggleButtonGroup
      value={themeContext ? themeContext.mode : THEME_MODES.LIGHT}
      exclusive
      color="primary"
      orientation="vertical"
      sx={{
        mb: 2,
      }}
      onChange={handleChange}
    >
      {themeModes.map((themeMode) => (
        <ToggleButton
          key={`ThemeModeToggleButton-${themeMode}`}
          value={themeMode}
          size="small"
          sx={{
            justifyContent: "flex-start",
          }}
        >
          {createElement(icons[themeMode], {
            sx: { mr: 1 },
          })}
          {t(`common.themeModes.${themeMode}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ThemeMode;
