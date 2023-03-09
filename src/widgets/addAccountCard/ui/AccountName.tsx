import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AccountName = () => {
  const { t } = useTranslation();
  const { register, formState, getFieldState } = useFormContext();
  const { error } = getFieldState("accountName", formState);

  return (
    <TextField
      {...register("accountName", {
        required: t("validation.required", {
          field: t("common.accountName").toLowerCase(),
        }),
      })}
      size="small"
      label={t("common.accountName")}
      fullWidth
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};

export default AccountName;
