import { create } from 'zustand'

import initialState from '../../lib/static/initialState'
import { Store } from '../../lib/typings/store'

export default create<Store>((set) => ({
  ...initialState,
  openSnackBar: (snackBarInfo) =>
    set(() => ({
      isOpened: true,
      ...snackBarInfo,
    })),
  closeSnackBar: () => set(() => ({ isOpened: false })),
}))
