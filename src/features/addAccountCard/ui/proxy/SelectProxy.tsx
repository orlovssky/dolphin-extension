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

import getProxies from '../../api/requests/getProxies'
import MODE from '../../lib/constants/PROXY_MODE'
import { SelectedProxy } from '../../lib/typings/proxy'
import isEqualProxies from '../../lib/utils/isEqualProxies'

const isAnty = import.meta.env.MODE === VITE_MODE.ANTY

const SelectProxy = () => {
  const { t } = useTranslation()
  const { control, setValue, watch } = useFormContext()
  const antyProfile = useAntyProfileStore((state) => state.profile)
  const dolphinTokenInfo = useDolphinTokenStore((state) => state.tokenInfo)
  const [items, setItems] = useState<SelectedProxy[]>([])
  const [loading, setLoading] = useState(false)
  const mode = watch('proxyMode') as MODE
  const debounce = useDebouncedCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (dolphinTokenInfo?.type === DOLPHIN_TYPE.CLOUD) {
        setLoading(true)

        getProxies({
          ...dolphinTokenInfo,
          search: value,
        })
          .then((data) => {
            setItems([...new Set(items.concat(data))])
          })
          .finally(() => {
            setLoading(false)
          })
      }
    },
    500,
  )

  useEffect(() => {
    if (!dolphinTokenInfo) {
      return
    }

    setLoading(true)

    getProxies(dolphinTokenInfo)
      .finally(() => {
        setLoading(false)
      })
      .then((data) => {
        if (isAnty && antyProfile?.proxy) {
          let preselectedProxy = null

          for (const proxy of data) {
            if (isEqualProxies(proxy, antyProfile.proxy)) {
              preselectedProxy = proxy

              break
            }
          }

          if (preselectedProxy) {
            setValue('selectedProxy', preselectedProxy)
          } else {
            let newProxy = `${antyProfile.proxy.type}://${antyProfile.proxy.host}:${antyProfile.proxy.port}`

            if (antyProfile.proxy.login && antyProfile.proxy.password) {
              newProxy += `:${antyProfile.proxy.login}:${antyProfile.proxy.password}`
            }

            if (antyProfile.proxy.name) {
              setValue('newProxyName', antyProfile.proxy.name)
            }

            if (antyProfile.proxy.changeIpUrl) {
              setValue('withChangeIpUrl', true)
              setValue('changeIpUrl', antyProfile.proxy.changeIpUrl)
            }

            setValue('newProxy', newProxy)
            setValue('proxyMode', MODE.NEW_PROXY)
          }
        }

        setItems(data)
      })
  }, [])

  return mode === MODE.SELECT_PROXY ? (
    <Controller
      name="selectedProxy"
      control={control}
      rules={{
        required: t('validation.required', {
          field: t('proxy.proxy').toLowerCase(),
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          sx={{ mt: 1.5 }}
          value={field.value}
          options={items}
          getOptionLabel={({ name, type, ip, port }) =>
            name || `${type}://${ip}:${port}`
          }
          fullWidth
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('proxy.proxy')}
              size="small"
              error={Boolean(error)}
              helperText={error?.message}
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
  ) : null
}

export default SelectProxy
