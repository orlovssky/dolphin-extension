import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { createElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import icons from "../../lib/static/proxyIcons";
import modes from "../../lib/static/proxyModes";

const Mode = () => {
  const { t } = useTranslation();
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
            >
              {createElement(icons[mode], {
                fontSize: "small",
                sx: { mr: 0.3 },
              })}
              <Typography
                sx={{ fontSize: "0.7rem", whiteSpace: "nowrap" }}
                component="span"
              >
                {t(`proxy.${mode}`)}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
};

export default Mode;
