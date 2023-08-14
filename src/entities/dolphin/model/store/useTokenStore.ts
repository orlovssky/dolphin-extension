import { create } from 'zustand'

import { Store } from '../../lib/typings/token'

export default create<Store>((set) => ({
  token: null,
  tokenInfo: null,
  setToken: (token) => set(() => ({ token })),
  setTokenInfo: (tokenInfo) => set(() => ({ tokenInfo })),
  clearState: () => set(() => ({ token: null, tokenInfo: null })),
}))
