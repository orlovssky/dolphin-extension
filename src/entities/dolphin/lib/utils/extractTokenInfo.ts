import ERROR from '../constants/ERROR'
import TYPE from '../constants/TYPE'
import { TokenInfo } from '../typings/token'

export default (token: string): TokenInfo => {
  const decodedToken = window.atob(token)
  const [host, authorization, decodedType] = decodedToken.split('::')
  const isCloud = (decodedType as TYPE) === TYPE.CLOUD

  if (host && authorization) {
    return {
      host,
      authorization: isCloud ? `Bearer ${authorization}` : authorization,
      type: isCloud ? TYPE.CLOUD : TYPE.SERVER,
    }
  } else {
    throw new Error(ERROR.INVALID_TOKEN)
  }
}
