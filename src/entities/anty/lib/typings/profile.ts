import { Proxy } from './proxy'

interface Profile {
  name: string
  tags?: string[]
  useragent?: {
    mode: string
    value: string
  }
  proxy: Proxy
}

export interface Response {
  data: Profile
}

export interface Store {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}
