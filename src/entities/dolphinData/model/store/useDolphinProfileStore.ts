import { create } from "zustand";

import { IStore } from "../../lib/typings/dolphinProfile";

const useDolphinProfileStore = create<IStore>((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile })),
  clearProfile: () => set(() => ({ profile: null })),
}));

export default useDolphinProfileStore;
