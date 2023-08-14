import { SnackBar } from './snackBar'

export interface Store extends SnackBar {
  openSnackBar: (snackBarInfo: {
    message: SnackBar['message']
    severity: SnackBar['severity']
  }) => void
  closeSnackBar: () => void
}
