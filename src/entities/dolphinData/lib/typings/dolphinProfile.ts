export interface IProfile {
  id: string;
  username: string;
}

export interface IServerResponseProfile {
  success: boolean;
  data: {
    id: string;
    login: string;
    display_name: string;
  };
}

export interface ICloudResponseProfile {
  data: {
    id: string;
    username: string;
  };
}

export interface IStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
  clearProfile: () => void;
}
