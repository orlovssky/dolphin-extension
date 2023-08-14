import PROXY_MODE from '../constants/PROXY_MODE'

import { SelectedProxy } from './proxy'

export interface Form {
  accountName: string
  userAgent: string
  tags: string[]
  sendCookies: boolean
  proxyMode: PROXY_MODE
  selectedProxy: SelectedProxy | null
  newProxy: string
  newProxyName: string
  withChangeIpUrl: boolean
  changeIpUrl: string
}
