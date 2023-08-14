import { AddingProxy } from './proxy'

import Cookie = chrome.cookies.Cookie

export interface PostData {
  access_token: string
  useragent: string
  name: string
  tags: string[]
  proxy?: AddingProxy
  cookies: Cookie[] | null
}
