import axios from 'axios'
import { DOLPHIN_TYPE, DolphinTokenInfo } from 'entities/dolphin'

import ERROR from '../../lib/constants/ERROR'

export default async ({
  host,
  authorization,
  type,
  search,
}: DolphinTokenInfo & { search?: string }): Promise<string[]> => {
  if (type === DOLPHIN_TYPE.CLOUD) {
    let url = `${host}/tags?entity_type=accounts&perPage=100`

    if (search?.trim()) {
      url += `&q=${search}`
    }

    const { data } = await axios<{ data: { name: string }[] }>(url, {
      headers: { Authorization: authorization },
    })

    if (Array.isArray(data.data)) {
      return data.data.map(({ name }) => name)
    } else {
      throw new Error(ERROR.NO_VALID_TAGS)
    }
  } else {
    const { data } = await axios<{ data: string[]; success: boolean }>(
      `${host}/tags?only_from=accounts`,
      { headers: { Authorization: authorization } },
    )

    if (data.success && Array.isArray(data.data)) {
      return data.data
    } else {
      throw new Error(ERROR.NO_VALID_TAGS)
    }
  }
}
