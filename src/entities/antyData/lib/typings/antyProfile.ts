import { IProxy } from "./proxy";

interface IProfile {
  name: string;
  tags?: string[];
  useragent?: {
    mode: string;
    value: string;
  };
  proxy: IProxy;
}

export interface IResponseProfile {
  data: IProfile;
}

export interface IStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
  clearProfile: () => void;
}
