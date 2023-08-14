import ERROR from '../constants/ERROR'

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.systemPrivate.getAntyProfileID((profileId) => {
      if (profileId) {
        resolve(profileId)
      } else {
        reject(new Error(ERROR.NO_PROFILE_ID))
      }
    })
  })
}
