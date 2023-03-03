import { create } from "zustand";

import MODES from "../../lib/constants/MODES";
import { IStore } from "../../lib/typings/store";

const useThemeStore = create<IStore>((set) => ({
  mode: MODES.SYSTEM,
  setMode: (mode) => set(() => ({ mode })),
}));

export default useThemeStore;
