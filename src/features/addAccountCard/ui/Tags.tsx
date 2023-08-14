import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useAntyProfileStore } from 'entities/anty'
import { DOLPHIN_TYPE, useDolphinTokenStore } from 'entities/dolphin'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useEffect, useState } from 'react'
import { VITE_MODE } from 'shared/vite'
import { useDebouncedCallback } from 'use-debounce'

import getTags from '../api/requests/getTags'

const isAnty = import.meta.env.MODE === VITE_MODE.ANTY

const Tags = () => {
  const { t } = useTranslation()
  const { control, setValue } = useFormContext()
  const antyProfile = useAntyProfileStore((state) => state.profile)
  const dolphinTokenInfo = useDolphinTokenStore((state) => state.tokenInfo)
  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const debounce = useDebouncedCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (dolphinTokenInfo?.type !== DOLPHIN_TYPE.CLOUD) {
        return
      }

      setLoading(true)

      getTags({
        ...dolphinTokenInfo,
        search: target.value,
      })
        .then((data) => {
          setItems([...new Set(items.concat(data))])
        })
        .finally(() => {
          setLoading(false)
        })
    },
    500,
  )

  useEffect(() => {
    if (!dolphinTokenInfo) {
      return
    }

    setLoading(true)

    getTags(dolphinTokenInfo)
      .then((data) => {
        const tags = data

        if (isAnty && antyProfile?.tags && Array.isArray(antyProfile.tags)) {
          for (const tag of antyProfile.tags) {
            if (!tags.includes(tag)) {
              tags.push(tag)
            }
          }
        }

        setItems(tags)
      })
      .catch(() => {
        if (isAnty && antyProfile?.tags && Array.isArray(antyProfile.tags)) {
          setItems(antyProfile.tags)
        }
      })
      .finally(() => {
        setLoading(false)

        if (isAnty && antyProfile?.tags && Array.isArray(antyProfile.tags)) {
          setValue('tags', antyProfile.tags)
        }
      })
  }, [])

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => (
        <Autocomplete
          sx={{ mt: 2 }}
          value={field.value}
          options={items}
          fullWidth
          multiple
          freeSolo
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('common.tags')}
              size="small"
              helperText={t('common.optional')}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              onInput={debounce}
            />
          )}
          onChange={(_, value) => {
            field.onChange(value)
          }}
        />
      )}
    />
  )
}

export default Tags
