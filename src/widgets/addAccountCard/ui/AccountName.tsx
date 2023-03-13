import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AccountName = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name="accountName"
      control={control}
      rules={{
        required: t("validation.required", {
          field: t("common.accountName").toLowerCase(),
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          value={field.value}
          size="small"
          label={t("common.accountName")}
          fullWidth
          error={Boolean(error)}
          helperText={error?.message}
          onChange={({ target }) => {
            field.onChange(target.value);
          }}
        />
      )}
    />
  );
};

export default AccountName;
