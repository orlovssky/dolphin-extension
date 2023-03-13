import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { MouseEvent, createElement } from "react";
import { useTranslation } from "react-i18next";

import LOCALES from "../lib/constants/LOCALES";
import { setLocalLocale } from "../lib/helpers/localLocale";
import icons from "../lib/static/icons";
import locales from "../lib/static/locales";
import { TLocale } from "../lib/typings/locales";

const Locale = ({
  toggleButtonGroupProps,
}: {
  toggleButtonGroupProps?: ToggleButtonGroupProps;
}) => {
  const { i18n } = useTranslation();
  const handleChange = (event: MouseEvent<HTMLElement>, value: TLocale) => {
    if (!value || value === i18n.language) return;

    i18n.changeLanguage(value).then(() => {
      setLocalLocale(value);
    });
  };
  const getLocaleText = (locale: TLocale): string => {
    switch (locale) {
      case LOCALES.RUSSIAN:
        return "Русский";
      case LOCALES.CHINESE:
        return "中文";
      default:
        return "English";
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      orientation="vertical"
      exclusive
      {...toggleButtonGroupProps}
      value={i18n.language as TLocale}
      onChange={handleChange}
    >
      {locales.map((locale) => (
        <ToggleButton
          key={`LocaleToggleButton-${locale}`}
          value={locale}
          size="small"
          sx={{ justifyContent: "flex-start" }}
        >
          {createElement(icons[locale], {
            sx: { mr: 1 },
          })}
          {getLocaleText(locale)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Locale;
