import ERROR from '../constants/ERROR'
import MODE from '../constants/MODE'

const KEY = 'dolphin-theme-mode'

export const getLocalMode = async (): Promise<MODE> => {
  const result = await chrome.storage.local.get([KEY])

  if (result[KEY]) {
    return result[KEY]
  } else {
    throw new Error(ERROR.NO_LOCAL_MODE)
  }
}

export const setLocalMode = (value: MODE) => {
  if (Object.values(MODE).includes(value)) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    })
  }
}
