import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useTranslation } from "react-i18next";
import { MouseEvent, createElement } from "react";
import { LOCAL_STORAGE } from "services/constants/app/localStorage.constants";
import { LOCALES } from "services/constants/app/locale.constants";
import { locales, icons } from "services/static/app/locale.static";

const Locale = () => {
  const { i18n } = useTranslation();
  const handleChange = (event: MouseEvent<HTMLElement>, value: LOCALES) => {
    if (!value || value === i18n.language) return;

    chrome.storage.local
      .set({ [LOCAL_STORAGE.LOCALE]: value })
      .then(async () => {
        await i18n.changeLanguage(value);
      });
  };
  const getLocaleText = (locale: LOCALES): string => {
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
      value={i18n.language}
      exclusive
      color="primary"
      orientation="vertical"
      onChange={handleChange}
    >
      {locales.map((locale) => (
        <ToggleButton
          key={`LocaleToggleButton-${locale}`}
          value={locale}
          size="small"
          sx={{
            justifyContent: "flex-start",
          }}
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
