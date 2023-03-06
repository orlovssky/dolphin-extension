import { create } from "zustand";

import { IStore } from "../../lib/typings/dolphinProfile";

const useDolphinProfileStore = create<IStore>((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile })),
}));

export default useDolphinProfileStore;
