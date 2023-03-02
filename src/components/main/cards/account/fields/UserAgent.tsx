import TextField from "@mui/material/TextField";
import { Message, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const UserAgent = () => {
  const { t } = useTranslation();
  const { register, formState, getFieldState } = useFormContext();
  const { error } = getFieldState("userAgent", formState);

  return (
    <TextField
      {...register("userAgent", {
        required: t("validation.required", {
          field: "user-agent",
        }) as Message,
      })}
      size="small"
      label="User-Agent"
      fullWidth
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};

export default UserAgent;