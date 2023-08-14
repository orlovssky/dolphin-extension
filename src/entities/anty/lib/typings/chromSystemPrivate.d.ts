namespace chrome.systemPrivate {
  export function getAntyApiToken(callback: (apiToken: string) => void): void
  export function getAntyProfileID(callback: (profileId: string) => void): void
  export function getAntyBaseUrl(callback: (baseUrl: string) => void): void
  export function getAntyApiVersion(
    callback: (apiVersion: string) => void,
  ): void
  export function getAntyDolphinIntegrationToken(
    callback: (integrationToken: string) => void,
  ): void

  // export function getUserLanguage(callback: (locale: string) => void): void
  // всегда приходит ru
}
