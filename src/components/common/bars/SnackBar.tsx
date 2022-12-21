import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const SnackBar = ({
  text,
  isOpened,
  onClose,
}: {
  text: string;
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
    <Alert severity="success" onClose={onClose}>
      {text}
    </Alert>
  </Snackbar>
);

export default SnackBar;
