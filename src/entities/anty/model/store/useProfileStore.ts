import { create } from 'zustand'

import { Store } from '../../lib/typings/profile'

export default create<Store>((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile })),
  clearProfile: () => set(() => ({ profile: null })),
}))
