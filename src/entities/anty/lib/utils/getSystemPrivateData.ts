import getSystemPrivateApiToken from './getSystemPrivateApiToken'
import getSystemPrivateApiVersion from './getSystemPrivateApiVersion'
import getSystemPrivateBaseUrl from './getSystemPrivateBaseUrl'
import getSystemPrivateProfileId from './getSystemPrivateProfileId'

export default async (): Promise<{
  id: string
  baseUrl: string
  apiToken: string
  apiVersion: string
}> => {
  const id = await getSystemPrivateProfileId()
  const baseUrl = await getSystemPrivateBaseUrl()
  const apiToken = await getSystemPrivateApiToken()
  const apiVersion = await getSystemPrivateApiVersion()

  return {
    id,
    baseUrl,
    apiToken,
    apiVersion,
  }
}
