import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const WithCookies = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name="withCookies"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          sx={{ mt: 0.5 }}
          control={
            <Switch
              checked={field.value}
              onChange={({ target }) => field.onChange(target.checked)}
            />
          }
          label={t("common.sendCookies")}
        />
      )}
    />
  );
};

export default WithCookies;
