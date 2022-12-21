import { enUS, ruRU, zhCN } from "@mui/material/locale";
import CnIcon from "assets/icons/flags/circle/cn.icons";
import GbIcon from "assets/icons/flags/circle/gb.icons";
import RuIcon from "assets/icons/flags/circle/ru.icons";
import { LOCALES } from "services/constants/app/locale.constants";

export const locales = [LOCALES.RUSSIAN, LOCALES.ENGLISH, LOCALES.CHINESE];

export const localizations = {
  [LOCALES.ENGLISH]: enUS,
  [LOCALES.RUSSIAN]: ruRU,
  [LOCALES.CHINESE]: zhCN,
};

export const icons = {
  [LOCALES.RUSSIAN]: RuIcon,
  [LOCALES.ENGLISH]: GbIcon,
  [LOCALES.CHINESE]: CnIcon,
};
