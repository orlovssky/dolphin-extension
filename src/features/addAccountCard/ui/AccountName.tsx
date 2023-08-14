import TextField from '@mui/material/TextField'
import { useAntyProfileStore } from 'entities/anty'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { VITE_MODE } from 'shared/vite'

const isAnty = import.meta.env.MODE === VITE_MODE.ANTY

const AccountName = () => {
  const { t } = useTranslation()
  const { control, setValue } = useFormContext()
  const antyProfile = useAntyProfileStore((state) => state.profile)

  useEffect(() => {
    if (isAnty && antyProfile?.name) {
      setValue('accountName', antyProfile.name)
    }
  }, [])

  return (
    <Controller
      name="accountName"
      control={control}
      rules={{
        required: t('validation.required', {
          field: t('common.accountName').toLowerCase(),
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          value={field.value}
          size="small"
          label={t('common.accountName')}
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

export default AccountName
