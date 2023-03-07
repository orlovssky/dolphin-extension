interface IProfile {
  id: string;
  login: string;
  display_name: string;
}

export interface IResponseProfile {
  success: boolean;
  data: IProfile;
}

export interface IStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
  clearProfile: () => void;
}
