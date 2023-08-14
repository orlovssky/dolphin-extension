import ERROR from '../constants/ERROR'

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.systemPrivate.getAntyDolphinIntegrationToken((integrationToken) => {
      if (integrationToken) {
        resolve(integrationToken)
      } else {
        reject(new Error(ERROR.NO_DOLPHIN_INTEGRATION_TOKEN))
      }
    })
  })
}
