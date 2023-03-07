export interface IStore {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
}
