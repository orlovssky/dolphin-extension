import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import { DOLPHIN_TYPE, useDolphinTokenStore } from 'entities/dolphin'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { createElement } from 'react'

import MODE from '../../lib/constants/PROXY_MODE'
import proxyModesList from '../../lib/static/proxyModesList'

const Mode = () => {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const dolphinTokenInfo = useDolphinTokenStore((state) => state.tokenInfo)

  return (
    <Controller
      name="proxyMode"
      control={control}
      render={({ field }) => (
        <ToggleButtonGroup
          value={field.value}
          exclusive
          fullWidth
          color="primary"
          onChange={(_, value) => {
            if (value) {
              field.onChange(value)
            }
          }}
        >
          {proxyModesList
            .filter(
              ({ mode }) =>
                dolphinTokenInfo?.type === DOLPHIN_TYPE.SERVER ||
                mode !== MODE.NO_PROXY,
            )
            .map(({ mode, icon }) => (
              <ToggleButton
                key={`ProxyModeToggleButton-${mode}`}
                value={mode}
                size="small"
              >
                {createElement(icon, {
                  fontSize: 'small',
                  sx: { mr: 0.3 },
                })}
                <Typography
                  sx={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}
                  component="span"
                >
                  {t(`proxy.${mode}`)}
                </Typography>
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      )}
    />
  )
}

export default Mode
