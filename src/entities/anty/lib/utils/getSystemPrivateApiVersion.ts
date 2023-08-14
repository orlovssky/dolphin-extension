import ERROR from '../constants/ERROR'

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.systemPrivate.getAntyApiVersion((apiVersion) => {
      if (apiVersion) {
        resolve(apiVersion)
      } else {
        reject(new Error(ERROR.NO_API_VERSION))
      }
    })
  })
}
