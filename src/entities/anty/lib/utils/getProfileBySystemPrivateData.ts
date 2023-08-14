import getProfileBySystemPrivateData from '../../api/requests/getProfileBySystemPrivateData'

import getSystemPrivateData from './getSystemPrivateData'

export default async () => {
  const systemPrivateData = await getSystemPrivateData()

  return getProfileBySystemPrivateData(systemPrivateData)
}
