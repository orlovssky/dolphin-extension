import ClearIcon from '@mui/icons-material/Clear'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import {
  useDolphinTokenStore,
  DOLPHIN_ERROR,
  useGetDolphinProfile,
} from 'entities/dolphin'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import Card from 'shared/ui/card'
import { useSnackBarStore } from 'shared/ui/snackBar'

const ConnectionCard = () => {
  const { t } = useTranslation()
  const getDolphinProfile = useGetDolphinProfile()
  const dolphinToken = useDolphinTokenStore((state) => state.token)
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (!token) {
      return
    }

    setLoading(true)

    getDolphinProfile(token, true)
      .catch((error) => {
        let message = t('common.somethingWentWrong')

        switch (error.message as DOLPHIN_ERROR) {
          case DOLPHIN_ERROR.INVALID_TOKEN:
            message = t('dolphin.invalidDolphinToken')
            break

          case DOLPHIN_ERROR.PROFILE_RESPONSE_NOT_SUCCESS:
            message = t('dolphin.connectionNotEstablished')
            break
        }

        openSnackBar({ message, severity: 'error' })

        console.info(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Card
      title={t('dolphin.connection')}
      cardProps={{
        sx: {
          width: '100%',
          minHeight: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      }}
    >
      <TextField
        value={token}
        label={t('dolphin.token')}
        fullWidth
        size="small"
        disabled={loading}
        sx={{ mt: 0.5 }}
        InputProps={{
          endAdornment: Boolean(token) && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={() => {
                  setToken('')
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
          setToken(target.value)
        }}
      />

      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <LoadingButton
          variant="contained"
          loading={loading}
          sx={{ width: '100%' }}
          disabled={Boolean(token) && token === dolphinToken}
          onClick={handleClick}
        >
          {t('common.connect')}
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default ConnectionCard
