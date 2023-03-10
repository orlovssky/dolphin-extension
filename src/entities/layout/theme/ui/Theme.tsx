import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { MouseEvent, createElement } from "react";
import { useTranslation } from "react-i18next";

import { setLocalThemeMode } from "../lib/helpers/localThemeMode";
import icons from "../lib/static/icons";
import themeModes from "../lib/static/themeModes";
import { TMode } from "../lib/typings/theme";
import useThemeStore from "../model/store/useThemeStore";

const Theme = ({
  toggleButtonGroupProps,
}: {
  toggleButtonGroupProps?: ToggleButtonGroupProps;
}) => {
  const { t } = useTranslation();
  const { mode, setMode } = useThemeStore((state) => state);
  const handleChange = (event: MouseEvent<HTMLElement>, value: TMode) => {
    if (!value || value === mode) return;

    setMode(value);
    setLocalThemeMode(value);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      orientation="vertical"
      exclusive
      {...toggleButtonGroupProps}
      value={mode}
      onChange={handleChange}
    >
      {themeModes.map((themeMode) => (
        <ToggleButton
          key={`ThemeModeToggleButton-${themeMode}`}
          value={themeMode}
          size="small"
          sx={{ justifyContent: "flex-start" }}
        >
          {createElement(icons[themeMode], { sx: { mr: 1 } })}
          {t(`common.themeModes.${themeMode}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Theme;
