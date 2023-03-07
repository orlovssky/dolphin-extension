import { create } from "zustand";

import { IStore } from "../../lib/typings/store";

const useSnackBarStore = create<IStore>((set) => ({
  isOpened: false,
  message: "",
  severity: "success",
  openSnackBar: (snackBar) =>
    set(() => ({
      isOpened: true,
      ...snackBar,
    })),
  closeSnackBar: () => set(() => ({ isOpened: false })),
}));

export default useSnackBarStore;
