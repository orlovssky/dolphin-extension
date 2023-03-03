import LOCALES from "../constants/LOCALES";

export type TLocale = (typeof LOCALES)[keyof typeof LOCALES];
