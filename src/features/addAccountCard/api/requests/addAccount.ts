import axios from 'axios'
import { DolphinTokenInfo, DOLPHIN_TYPE } from 'entities/dolphin'

import ERROR from '../../lib/constants/ERROR'
import { PostData } from '../../lib/typings/account'

export default async ({
  host,
  authorization,
  type,
  postData,
}: DolphinTokenInfo & { postData: PostData }) => {
  if (type === DOLPHIN_TYPE.CLOUD) {
    const newAccount = {
      access_token: postData.access_token,
      name: postData.name,
      user_agent: postData.useragent,
      cookies: postData.cookies ? JSON.stringify(postData.cookies) : undefined,
      tags: postData.tags,
      proxy_id:
        postData.proxy && 'id' in postData.proxy
          ? postData.proxy.id
          : undefined,
      proxy:
        postData.proxy && !('id' in postData.proxy)
          ? {
              type: postData.proxy.type,
              host: postData.proxy.ip,
              port: postData.proxy.port,
              name: postData.proxy.name,
              login: postData.proxy.login,
              password: postData.proxy.password,
              change_ip_url: postData.proxy.change_ip_url,
            }
          : undefined,
    }

    return axios.post(
      `${host}/accounts`,
      { accounts: [newAccount] },
      {
        headers: { Authorization: authorization },
      },
    )
  } else {
    const { data } = await axios.post(`${host}/accounts/add`, postData, {
      headers: { Authorization: authorization },
    })

    if (!data.success) {
      throw new Error(ERROR.ADDITION_NOT_SUCCESSFUL)
    }
  }
}
