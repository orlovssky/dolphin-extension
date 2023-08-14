export interface Proxy {
  name: string
  type: 'http' | 'socks5'
  host: string
  port: number
  login: string
  password: string
  changeIpUrl: string
}

export interface SelectedProxy {
  id: number | string
  name: string
  type: string
  ip: string
  port: number
  login: string
  password: string
  change_ip_url: string
}

export interface CloudProxy {
  id: string
  name: string
  type: string
  host: string
  port: string
  login: string
  password: string
  change_ip_url: string
}

interface NewProxy {
  name: string
  type: string
  ip: string
  port: number
  login: string
  password: string
  change_ip_url: string
}

export type AddingProxy = SelectedProxy | NewProxy
