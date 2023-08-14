import { create } from 'zustand'

import { Store } from '../../lib/typings/token'

const useTokenStore = create<Store>((set) => ({
  token: '',
  setToken: (token) => set(() => ({ token })),
  clearToken: () => set(() => ({ token: '' })),
}))

export default useTokenStore
