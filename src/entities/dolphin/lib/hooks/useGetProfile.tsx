import { useTranslation } from 'react-i18next'
import { useSnackBarStore } from 'shared/ui/snackBar'

import getProfile from '../utils/getProfile'

import useSetData from './useSetData'

const useGetProfile = () => {
  const { t } = useTranslation()
  const setData = useSetData()
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar)

  return async (token?: string, saveToken?: boolean) => {
    const profileData = await getProfile(token)

    if (profileData) {
      const { profile, tokenInfo } = profileData

      setData({ profile, token, tokenInfo }, saveToken)
      openSnackBar({
        message: t('dolphin.connectionEstablished'),
        severity: 'success',
      })
    }
  }
}

export default useGetProfile
