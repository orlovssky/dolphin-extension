import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import useSnackBarStore from '../model/store/snackBar'

const SnackBar = () => {
  const { isOpened, message, severity, closeSnackBar } = useSnackBarStore(
    (state) => state,
  )

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      autoHideDuration={5000}
      open={isOpened}
      onClose={closeSnackBar}
    >
      <Alert variant="filled" severity={severity} onClose={closeSnackBar}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
