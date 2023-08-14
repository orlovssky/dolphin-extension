import { setLocalToken } from '../../lib/utils/localToken'
import useProfileStore from '../../model/store/useProfileStore'
import useTokenStore from '../../model/store/useTokenStore'
import { Profile } from '../typings/profile'
import { TokenInfo } from '../typings/token'

const useSetData = () => {
  const setProfile = useProfileStore((state) => state.setProfile)
  const { setToken, setTokenInfo } = useTokenStore((state) => state)

  return (
    {
      profile,
      token,
      tokenInfo,
    }: { profile: Profile; token?: string; tokenInfo?: TokenInfo },
    saveToken = false,
  ) => {
    setProfile(profile)

    if (token) {
      setToken(token)

      if (saveToken) {
        setLocalToken(token)
      }
    }

    if (tokenInfo) {
      setTokenInfo(tokenInfo)
    }
  }
}

export default useSetData
