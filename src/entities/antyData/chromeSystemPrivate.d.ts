declare namespace chrome.systemPrivate {
  export function getAntyDolphinIntegrationToken(
    callback: (token?: string) => void
  ): void;
  export function getAntyApiToken(callback: (token?: string) => void): void;
  export function getAntyProfileID(callback: (id?: string) => void): void;
  export function getAntyBaseUrl(callback: (baseUrl?: string) => void): void;
  export function getUserLanguage(callback: (language?: string) => void): void;
  export function getAntyApiVersion(callback: (version?: string) => void): void;
}
