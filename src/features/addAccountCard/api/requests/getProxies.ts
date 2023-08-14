import axios from 'axios'
import { DOLPHIN_TYPE, DolphinTokenInfo } from 'entities/dolphin'

import ERROR from '../../lib/constants/ERROR'
import { SelectedProxy, CloudProxy } from '../../lib/typings/proxy'

export default async ({
  host,
  authorization,
  type,
  search,
}: DolphinTokenInfo & { search?: string }): Promise<SelectedProxy[]> => {
  if (type === DOLPHIN_TYPE.CLOUD) {
    let url = `${host}/proxies?platform=FB&perPage=100`

    if (search?.trim()) {
      url += `&q=${search}`
    }

    const { data } = await axios<{ data: CloudProxy[] }>(url, {
      headers: { Authorization: authorization },
    })

    if (Array.isArray(data.data)) {
      return data.data.map((element) => ({
        id: element.id,
        name: element.name,
        type: element.type,
        ip: element.host,
        port: +element.port,
        login: element.login,
        password: element.password,
        change_ip_url: element.change_ip_url,
      }))
    } else {
      throw new Error(ERROR.NO_VALID_PROXIES)
    }
  } else {
    const { data } = await axios<{ data: SelectedProxy[]; success: boolean }>(
      `${host}/proxy`,
      { headers: { Authorization: authorization } },
    )

    if (data.success && Array.isArray(data.data)) {
      return data.data
    } else {
      throw new Error(ERROR.NO_VALID_PROXIES)
    }
  }
}
