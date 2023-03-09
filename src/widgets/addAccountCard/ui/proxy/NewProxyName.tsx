import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const NewProxyName = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name="newProxyName"
      control={control}
      render={({ field }) => (
        <TextField
          sx={{ mt: 1.5 }}
          value={field.value}
          size="small"
          label={t("proxy.proxyName")}
          fullWidth
          helperText={t("common.optional")}
          onChange={({ target }) => {
            field.onChange(target.value);
          }}
        />
      )}
    />
  );
};

export default NewProxyName;
