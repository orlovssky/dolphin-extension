import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AccountName = ({
  formRegister,
  error,
}: {
  formRegister: UseFormRegisterReturn;
  error?: FieldError;
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      {...formRegister}
      sx={{ mt: 1.5 }}
      size="small"
      label={t("common.accountName")}
      fullWidth
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};

export default AccountName;
