interface IProfile {
  tags: string[];
}

export interface IResponseProfile {
  data: IProfile;
}

export interface IStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
  clearProfile: () => void;
}
