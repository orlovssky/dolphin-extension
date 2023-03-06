// noinspection JSUnusedGlobalSymbols

import "i18next";
import { TLocale } from "../typings/locales";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    language: TLocale;
  }
}
