import { getChromeCurrentTabInfo } from 'shared/chrome'

import InjectionResult = chrome.scripting.InjectionResult
import ERROR from '../constants/ERROR'

const executeScriptFunc = () => {
  return Array.from(document.getElementsByTagName('script')).map(
    (scriptElement) => scriptElement.innerHTML,
  )
}

const executeScript = (tabId: number): Promise<InjectionResult<string[]>[]> => {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: executeScriptFunc,
      },
      resolve,
    )
  })
}

const findAccessToken = ([{ result }]: InjectionResult<
  string[]
>[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    for (const string of result) {
      if (!string.includes('window.__accessToken')) {
        continue
      }

      const matchedFbToken = string.match(/"EA[A-Za-z0-9]{20,}/gm)

      if (matchedFbToken) {
        resolve(matchedFbToken[0].substring(1))
      }
    }

    reject(new Error(ERROR.TOKEN_NOT_FOUND))
  })
}

export default async (): Promise<string> => {
  const { id } = await getChromeCurrentTabInfo()
  const results = await executeScript(id)

  return findAccessToken(results)
}
