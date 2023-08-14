import TextField from '@mui/material/TextField'
import { useAntyProfileStore } from 'entities/anty'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { getChromeCurrentTabInfo } from 'shared/chrome'
import { VITE_MODE } from 'shared/vite'

const isAnty = import.meta.env.MODE === VITE_MODE.ANTY

const UserAgent = () => {
  const { t } = useTranslation()
  const { control, setValue } = useFormContext()
  const antyProfile = useAntyProfileStore((state) => state.profile)

  useEffect(() => {
    if (isAnty && antyProfile?.useragent?.value) {
      setValue('userAgent', antyProfile.useragent.value)

      return
    }

    getChromeCurrentTabInfo().then(({ id: tabId }) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: () => window.navigator.userAgent,
        },
        (results) => {
          if (Array.isArray(results) && results.length) {
            setValue('userAgent', results[0].result)
          }
        },
      )
    })
  }, [])

  return (
    <Controller
      name="userAgent"
      control={control}
      rules={{
        required: t('validation.required', {
          field: 'user-agent',
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ mt: 2 }}
          value={field.value}
          size="small"
          label="User-Agent"
          fullWidth
          error={Boolean(error)}
          helperText={error?.message}
          onChange={({ target }) => {
            field.onChange(target.value)
          }}
        />
      )}
    />
  )
}

export default UserAgent
