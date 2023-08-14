import { AlertColor } from '@mui/material/Alert'

export interface SnackBar {
  isOpened: boolean
  message: string
  severity: AlertColor
}
