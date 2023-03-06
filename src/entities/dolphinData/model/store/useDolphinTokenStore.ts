import { create } from "zustand";

import { IStore } from "../../lib/typings/dolphinToken";

const useDolphinTokenStore = create<IStore>((set) => ({
  dolphinToken: "",
  setDolphinToken: (dolphinToken) => set(() => ({ dolphinToken })),
}));

export default useDolphinTokenStore;
