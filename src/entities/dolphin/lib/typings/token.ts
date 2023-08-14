import TYPE from '../constants/TYPE'

export interface TokenInfo {
  host: string
  authorization: string
  type: TYPE
}

export interface Store {
  token: string | null
  tokenInfo: TokenInfo | null
  setToken: (token: string) => void
  setTokenInfo: (tokenInfo: TokenInfo) => void
  clearState: () => void
}
