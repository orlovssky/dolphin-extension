interface IProfile {
  tags?: string[];
  useragent?: {
    mode: string;
    value: string;
  };
}

export interface IResponseProfile {
  data: IProfile;
}

export interface IStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
  clearProfile: () => void;
}
