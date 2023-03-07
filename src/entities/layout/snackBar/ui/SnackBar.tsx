import Alert from "@mui/material/Alert";
import MuiSnackbar from "@mui/material/Snackbar";

import useSnackBarStore from "../model/store/snackBar";

const SnackBar = () => {
  const { isOpened, message, severity, closeSnackBar } = useSnackBarStore(
    (state) => state
  );

  return (
    <MuiSnackbar
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      autoHideDuration={5000}
      open={isOpened}
      onClose={closeSnackBar}
    >
      <Alert variant="filled" severity={severity} onClose={closeSnackBar}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default SnackBar;
