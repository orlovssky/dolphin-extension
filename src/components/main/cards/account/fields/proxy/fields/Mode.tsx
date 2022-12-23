import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createElement } from "react";
import { LOCALES } from "services/constants/app/locale.constants";

export enum MODES {
  NO_PROXY = "noProxy",
  NEW_PROXY = "newProxy",
  SELECT_PROXY = "selectProxy",
}
const modes = [MODES.NO_PROXY, MODES.NEW_PROXY, MODES.SELECT_PROXY];
const icons = {
  [modes[0]]: DoNotDisturbAltIcon,
  [modes[1]]: AddCircleOutlineIcon,
  [modes[2]]: PanToolAltOutlinedIcon,
};

const Mode = () => {
  const { t, i18n } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name="proxyMode"
      control={control}
      render={({ field }) => (
        <ToggleButtonGroup
          value={field.value}
          exclusive
          fullWidth
          color="primary"
          onChange={(_, value) => {
            if (value) {
              field.onChange(value);
            }
          }}
        >
          {modes.map((mode) => (
            <ToggleButton
              key={`ProxyModeToggleButton-${mode}`}
              value={mode}
              size="small"
              sx={{
                justifyContent:
                  i18n.language === LOCALES.RUSSIAN ? "flex-start" : "center",
              }}
            >
              {createElement(icons[mode], {
                fontSize: "small",
                sx: { mr: 0.5 },
              })}
              <Typography
                sx={{ fontSize: "0.7rem", whiteSpace: "nowrap" }}
                component="span"
              >
                {t(`common.proxy.${mode}`)}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
};

export default Mode;
