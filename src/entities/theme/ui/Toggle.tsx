import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { useTranslation } from 'react-i18next'
import { MouseEvent, createElement } from 'react'

import MODE from '../lib/constants/MODE'
import modesList from '../lib/static/modesList'
import { setLocalMode } from '../lib/utils/localMode'
import useThemeStore from '../model/store/useThemeStore'

const Toggle = ({
  toggleButtonGroupProps,
}: {
  toggleButtonGroupProps?: ToggleButtonGroupProps
}) => {
  const { t } = useTranslation()
  const { mode, setMode } = useThemeStore((state) => state)

  const handleChange = (_: MouseEvent<HTMLElement>, value: MODE) => {
    if (value && value !== mode) {
      setMode(value)
      setLocalMode(value)
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      orientation="vertical"
      exclusive
      value={mode}
      onChange={handleChange}
      {...toggleButtonGroupProps}
    >
      {modesList.map(({ mode, icon }) => (
        <ToggleButton
          key={`ThemeModeToggleButton-${mode}`}
          value={mode}
          size="small"
          sx={{ justifyContent: 'flex-start' }}
        >
          {createElement(icon, { sx: { mr: 1 } })}
          {t(`common.themeModes.${mode}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default Toggle
