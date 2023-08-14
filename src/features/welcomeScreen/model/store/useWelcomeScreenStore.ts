import { create } from 'zustand'

import { Store } from '../../lib/typings/store'

const useWelcomeScreenStore = create<Store>((set) => ({
  show: true,
  setShow: (value) => set(() => ({ show: value })),
}))

export default useWelcomeScreenStore
