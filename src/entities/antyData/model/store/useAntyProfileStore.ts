import { create } from "zustand";

import { IStore } from "../../lib/typings/antyProfile";

const useAntyProfileStore = create<IStore>((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile })),
  clearProfile: () => set(() => ({ profile: null })),
}));

export default useAntyProfileStore;
