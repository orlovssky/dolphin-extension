import ERROR from '../constants/ERROR'

const KEY = 'dolphin-token'

export const getLocalToken = async (): Promise<string> => {
  const result = await chrome.storage.local.get([KEY])

  if (result[KEY]) {
    return result[KEY]
  } else {
    throw new Error(ERROR.NO_LOCAL_TOKEN)
  }
}

export const setLocalToken = (value: string) => {
  if (value && value.trim()) {
    chrome.storage.local.set({ [KEY]: value }).then(() => {
      // do nothing
    })
  }
}

export const removeLocalToken = () => {
  chrome.storage.local.remove([KEY]).then(() => {
    // do nothing
  })
}
