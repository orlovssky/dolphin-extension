interface IProfile {
  id: string;
  login: string;
}

export interface IResponseProfile {
  success: boolean;
  data: IProfile;
}

export interface IStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
}
