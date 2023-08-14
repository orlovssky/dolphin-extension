import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import DialogChangeIpUrl from './DialogChangeIpUrl'

const NewProxyChangeIpUrl = () => {
  const { t } = useTranslation()
  const { setValue, control, watch } = useFormContext()
  const [dialogChangeIpUrlOpened, setDialogChangeIpUrlOpened] = useState(false)

  return (
    <>
      <DialogChangeIpUrl
        isOpened={dialogChangeIpUrlOpened}
        onClose={() => {
          setDialogChangeIpUrlOpened(false)
        }}
        onAgree={() => {
          setDialogChangeIpUrlOpened(false)
          setValue('withChangeIpUrl', true)
        }}
      />

      <Controller
        name="withChangeIpUrl"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            sx={{ mt: 0.5 }}
            control={
              <Switch
                checked={field.value}
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    setDialogChangeIpUrlOpened(true)
                  } else {
                    setValue('withChangeIpUrl', false)
                  }
                }}
              />
            }
            label={t('proxy.sendChangeIpUrl')}
          />
        )}
      />

      {watch('withChangeIpUrl') && (
        <Controller
          name="changeIpUrl"
          control={control}
          rules={{
            required: t('validation.required', {
              field: t('proxy.changeIpUrl').toLowerCase(),
            }),
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              sx={{ my: 1.5 }}
              value={field.value}
              size="small"
              label={t('proxy.changeIpUrl')}
              fullWidth
              error={Boolean(error)}
              helperText={error?.message}
              onChange={({ target }) => {
                field.onChange(target.value)
              }}
            />
          )}
        />
      )}
    </>
  )
}

export default NewProxyChangeIpUrl
