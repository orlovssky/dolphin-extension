import psl from 'psl'

import ERROR from '../constants/ERROR'

export default (url: string) => {
  const { host } = new URL(url)
  const parsed = psl.parse(host)

  if ('domain' in parsed && parsed.domain) {
    return parsed.domain
  }

  throw new Error(parsed.error?.message || ERROR.DOMAIN_NOT_FOUND)
}
