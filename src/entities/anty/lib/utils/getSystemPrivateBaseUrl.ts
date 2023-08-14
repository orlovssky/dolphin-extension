import ERROR from '../constants/ERROR'

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.systemPrivate.getAntyBaseUrl((baseUrl) => {
      if (baseUrl) {
        resolve(baseUrl)
      } else {
        reject(new Error(ERROR.NO_BASE_URL))
      }
    })
  })
}
