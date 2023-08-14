import getProfileByToken from '../../api/requests/getProfileByToken'
import { PromiseReturn } from '../typings/profile'

import { getLocalToken, removeLocalToken } from './localToken'

export default async (token?: string): Promise<PromiseReturn> => {
  if (token === undefined) {
    const localToken = await getLocalToken()

    return getProfileByToken(localToken).catch((error) => {
      removeLocalToken()

      throw error
    })
  } else {
    return getProfileByToken(token)
  }
}
