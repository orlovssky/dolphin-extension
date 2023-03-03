import MODES from "../constants/MODES";

export type TMode = (typeof MODES)[keyof typeof MODES];
