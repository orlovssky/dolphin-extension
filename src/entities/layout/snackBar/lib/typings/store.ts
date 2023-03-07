import { ISnackBar } from "./snackBar";

export interface IStore extends ISnackBar {
  openSnackBar: (snackBar: {
    message: ISnackBar["message"];
    severity: ISnackBar["severity"];
  }) => void;
  closeSnackBar: () => void;
}
