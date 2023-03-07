export interface IStore {
  dolphinToken: string;
  setDolphinToken: (dolphinToken: string) => void;
  clearDolphinToken: () => void;
}

export interface IDolphinTokenData {
  host: string;
  authorization: string;
}
