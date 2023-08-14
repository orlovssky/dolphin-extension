import { TokenInfo } from './token'

export interface Profile {
  id: string
  username: string
}

export interface ServerResponse {
  success: boolean
  data: {
    id: string
    login: string
    display_name: string
  }
}

export interface CloudResponse {
  data: {
    id: string
    username: string
  }
}

export interface Store {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}

export interface PromiseReturn {
  profile: Profile
  tokenInfo: TokenInfo
}
