import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const UserAgent = ({
  formRegister,
  error,
}: {
  formRegister: UseFormRegisterReturn;
  error?: FieldError;
}) => (
  <TextField
    {...formRegister}
    size="small"
    label="User-Agent"
    fullWidth
    error={Boolean(error)}
    helperText={error?.message}
  />
);

export default UserAgent;
