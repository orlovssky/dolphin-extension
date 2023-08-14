import axios from 'axios'

import { Response } from '../../lib/typings/profile'

export default ({
  id,
  baseUrl,
  apiToken,
  apiVersion,
}: {
  id: string
  baseUrl: string
  apiToken: string
  apiVersion: string
}) => {
  return axios<Response>(`${baseUrl}/browser_profiles/${id}`, {
    headers: {
      Authorization: apiToken,
      'X-Anty-App-Version': apiVersion,
    },
  })
}
