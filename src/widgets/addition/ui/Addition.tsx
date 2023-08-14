import {
  extractFacebookToken,
  useFacebookTokenStore,
  isFacebookError,
} from 'entities/facebook'
import AddAccountCard from 'features/addAccountCard'
import FacebookTokenCard from 'features/facebookTokenCard'
import { useEffect, useState } from 'react'
import { isChromeError } from 'shared/chrome'
import FullScreenCircularProgress from 'shared/ui/fullScreenCircularProgress'

const Addition = () => {
  const { token: facebookToken, setToken: setFacebookToken } =
    useFacebookTokenStore((state) => state)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    extractFacebookToken()
      .then((token) => {
        setFacebookToken(token)
      })
      .catch((error) => {
        if (isChromeError(error.message) || isFacebookError(error.message)) {
          console.info(error.message)
        } else {
          throw error
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <FullScreenCircularProgress />
  } else {
    return (
      <>
        <FacebookTokenCard />
        {Boolean(facebookToken) && <AddAccountCard />}
      </>
    )
  }
}

export default Addition
