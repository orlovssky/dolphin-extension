import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SendCookies = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name="sendCookies"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          sx={{ mt: 0.5 }}
          control={
            <Switch
              checked={field.value}
              color="primary"
              onChange={({ target }) => field.onChange(target.checked)}
            />
          }
          label={t("common.sendCookies")}
        />
      )}
    />
  );
};

export default SendCookies;
