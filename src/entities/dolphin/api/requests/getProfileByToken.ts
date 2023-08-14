import axios from 'axios'

import ERROR from '../../lib/constants/ERROR'
import TYPE from '../../lib/constants/TYPE'
import {
  CloudResponse,
  PromiseReturn,
  ServerResponse,
} from '../../lib/typings/profile'
import extractTokenInfo from '../../lib/utils/extractTokenInfo'

export default async (token: string): Promise<PromiseReturn> => {
  const tokenInfo = extractTokenInfo(token)

  if (tokenInfo.type === TYPE.CLOUD) {
    const { data } = await axios<CloudResponse>(
      `${tokenInfo.host}/auth/profile`,
      {
        headers: { Authorization: tokenInfo.authorization },
      },
    )

    return { profile: data.data, tokenInfo }
  } else {
    const { data } = await axios<ServerResponse>(`${tokenInfo.host}/profile`, {
      headers: { Authorization: tokenInfo.authorization },
    })

    if (data.data?.id) {
      return {
        profile: {
          id: data.data.id,
          username: data.data.display_name || data.data.login,
        },
        tokenInfo,
      }
    } else {
      throw new Error(ERROR.PROFILE_RESPONSE_NOT_SUCCESS)
    }
  }
}
