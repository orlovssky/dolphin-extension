import { AlertColor } from "@mui/material/Alert/Alert";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const SnackBar = ({
  text,
  severity = "success",
  isOpened,
  onClose,
}: {
  text: string;
  severity?: AlertColor;
  isOpened: boolean;
  onClose: () => void;
}) => (
  <Snackbar
    anchorOrigin={{
      horizontal: "right",
      vertical: "bottom",
    }}
    open={isOpened}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <Alert severity={severity} onClose={onClose}>
      {text}
    </Alert>
  </Snackbar>
);

export default SnackBar;
