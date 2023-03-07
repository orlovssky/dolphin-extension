import { create } from "zustand";

import { IStore } from "../../lib/typings/accessToken";

const useAccessTokenStore = create<IStore>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  clearAccessToken: () => set(() => ({ accessToken: "" })),
}));

export default useAccessTokenStore;
