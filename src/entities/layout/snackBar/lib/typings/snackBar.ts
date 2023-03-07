import { AlertColor } from "@mui/material/Alert";

export interface ISnackBar {
  isOpened: boolean;
  message: string;
  severity: AlertColor;
}
