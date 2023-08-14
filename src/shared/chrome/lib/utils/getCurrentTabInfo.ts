import ERROR from '../constants/ERROR'
import { Tab } from '../typings/tab'

import getUrlDomain from './getUrlDomain'

export default async (): Promise<Tab> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (!tab) {
    throw new Error(ERROR.NO_TAB)
  }

  if (!tab.url) {
    throw new Error(ERROR.NO_TAB_URL)
  } else {
    const urlDomain = getUrlDomain(tab.url)

    if (!urlDomain?.includes('facebook')) {
      throw new Error(ERROR.NOT_FACEBOOK_URL)
    }
  }

  if (!tab.id) {
    throw new Error(ERROR.NO_TAB_ID)
  }

  return {
    id: tab.id,
    url: tab.url,
  }
}
