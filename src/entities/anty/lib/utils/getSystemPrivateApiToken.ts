import ERROR from '../constants/ERROR'

export default async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.systemPrivate.getAntyApiToken((apiToken) => {
      if (apiToken) {
        resolve(apiToken)
      } else {
        reject(new Error(ERROR.NO_API_TOKEN))
      }
    })
  })
}
