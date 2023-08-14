import { create } from 'zustand'

import MODE from '../../lib/constants/MODE'
import { Store } from '../../lib/typings/store'

export default create<Store>((set) => ({
  mode: MODE.SYSTEM,
  setMode: (mode) => set(() => ({ mode })),
}))
