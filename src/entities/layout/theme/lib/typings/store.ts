import { TMode } from "../typings/theme";

export interface IStore {
  mode: TMode;
  setMode: (mode: TMode) => void;
}
