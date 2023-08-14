import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { useTranslation } from 'react-i18next'
import { MouseEvent, createElement } from 'react'

import LOCALE from '../lib/constants/LOCALE'
import localesList from '../lib/static/localesList'
import { setLocalLocale } from '../lib/utils/localLocale'

const Toggle = ({
  toggleButtonGroupProps,
}: {
  toggleButtonGroupProps?: ToggleButtonGroupProps
}) => {
  const { i18n } = useTranslation()

  const handleChange = (_: MouseEvent<HTMLElement>, value: LOCALE) => {
    if (value && value !== i18n.language) {
      i18n.changeLanguage(value).then(() => {
        setLocalLocale(value)
      })
    }
  }

  const getLocaleText = (locale: LOCALE): string => {
    switch (locale) {
      case LOCALE.ENGLISH:
        return 'English'

      case LOCALE.CHINESE:
        return '中文'

      case LOCALE.RUSSIAN:
        return 'Русский'
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      orientation="vertical"
      exclusive
      value={i18n.language as LOCALE}
      onChange={handleChange}
      {...toggleButtonGroupProps}
    >
      {localesList.map(({ locale, icon }) => (
        <ToggleButton
          key={`LocaleToggleButton-${locale}`}
          value={locale}
          size="small"
          sx={{ justifyContent: 'flex-start' }}
        >
          {createElement(icon, { sx: { mr: 1 } })}
          {getLocaleText(locale)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default Toggle
