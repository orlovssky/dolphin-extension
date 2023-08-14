import { removeLocalToken } from '../../lib/utils/localToken'
import useProfileStore from '../../model/store/useProfileStore'
import useTokenStore from '../../model/store/useTokenStore'

const useClearData = () => {
  const clearProfile = useProfileStore((state) => state.clearProfile)
  const clearTokenState = useTokenStore((state) => state.clearState)

  return () => {
    clearProfile()
    clearTokenState()
    removeLocalToken()
  }
}

export default useClearData
