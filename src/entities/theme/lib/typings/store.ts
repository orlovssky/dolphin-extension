import MODE from '../constants/MODE'

export interface Store {
  mode: MODE
  setMode: (mode: MODE) => void
}
