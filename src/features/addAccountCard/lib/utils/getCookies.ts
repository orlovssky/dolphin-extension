import { getChromeUrlDomain, getChromeCurrentTabInfo } from 'shared/chrome'

export default async (): Promise<chrome.cookies.Cookie[]> => {
  const { url } = await getChromeCurrentTabInfo()
  const domain = getChromeUrlDomain(url)

  return chrome.cookies.getAll({ domain })
}
