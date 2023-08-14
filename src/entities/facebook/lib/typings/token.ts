export interface Store {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}
