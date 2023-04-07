// noinspection JSUnusedGlobalSymbols

import "i18next";
import { TLocale } from "entities/layout/locale";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    language: TLocale;
  }
}
