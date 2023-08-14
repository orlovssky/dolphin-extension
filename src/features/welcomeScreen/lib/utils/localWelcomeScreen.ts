const KEY = 'dolphin-welcome-screen-showed'
import ERROR from '../constants/ERROR'

export const getLocalWelcomeScreenShowed = async (): Promise<string> => {
  const result = await chrome.storage.local.get([KEY])

  if (result[KEY]) {
    return result[KEY]
  } else {
    throw new Error(ERROR.NO_LOCAL_WELCOME_SCREEN)
  }
}

export const setLocalWelcomeScreenShowed = (value: boolean) => {
  chrome.storage.local.set({ [KEY]: value }).then(() => {
    // do nothing
  })
}
