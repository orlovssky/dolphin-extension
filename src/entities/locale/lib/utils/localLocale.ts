import ERROR from '../constants/ERROR'
import LOCALE from '../constants/LOCALE'

const KEY = 'dolphin-locale'

export const getLocalLocale = async (): Promise<LOCALE> => {
  const result = await chrome.storage.local.get([KEY])

  if (result[KEY]) {
    return result[KEY]
  } else {
    throw new Error(ERROR.NO_LOCAL_LOCALE)
  }
}

export const setLocalLocale = (value: LOCALE) => {
  if (Object.values(LOCALE).includes(value)) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    })
  }
}
