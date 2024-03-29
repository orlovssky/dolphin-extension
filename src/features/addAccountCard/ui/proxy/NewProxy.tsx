import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import MODE from '../../lib/constants/PROXY_MODE'

import DialogHint from './DialogHint'
import NewProxyChangeIpUrl from './NewProxyChangeIpUrl'
import NewProxyName from './NewProxyName'

const NewProxy = () => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const [dialogHintOpened, setDialogHintOpened] = useState(false)
  const mode = watch('proxyMode') as MODE

  return mode === MODE.NEW_PROXY ? (
    <>
      <DialogHint
        isOpened={dialogHintOpened}
        onClose={() => {
          setDialogHintOpened(false)
        }}
      />

      <Controller
        name="newProxy"
        control={control}
        rules={{
          required: t('validation.required', {
            field: t('proxy.proxy').toLowerCase(),
          }),
          pattern: {
            value: /.+:.+/,
            message: t('validation.regex', {
              field: t('proxy.proxy').toLowerCase(),
            }),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            sx={{ mt: 1.5 }}
            value={field.value}
            size="small"
            label={t('proxy.proxy')}
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            onChange={({ target }) => {
              field.onChange(target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => {
                      setDialogHintOpened(true)
                    }}
                  >
                    <InfoOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <NewProxyName />
      <NewProxyChangeIpUrl />
    </>
  ) : null
}

export default NewProxy
