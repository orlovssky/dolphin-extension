import {
  getAntyProfile,
  useAntyProfileStore,
  getSystemPrivateDolphinIntegrationToken,
  isAntyError,
} from 'entities/anty'
import {
  useDolphinProfileStore,
  useGetDolphinProfile,
  isDolphinError,
} from 'entities/dolphin'
import ConnectionCard from 'features/connectionCard'
import WelcomeScreen, {
  useWelcomeScreenStore,
  getLocalWelcomeScreenShowed,
  isWelcomeScreenError,
} from 'features/welcomeScreen'
import { useEffect, useState } from 'react'
import FullScreenCircularProgress from 'shared/ui/fullScreenCircularProgress'
import Addition from 'widgets/addition'

const Anty = () => {
  const getDolphinProfile = useGetDolphinProfile()
  const setAntyProfile = useAntyProfileStore((state) => state.setProfile)
  const dolphinProfile = useDolphinProfileStore((state) => state.profile)
  const { show: welcomeScreenShow, setShow: setWelcomeScreenShow } =
    useWelcomeScreenStore((state) => state)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSystemPrivateDolphinIntegrationToken()
      .then((token) => {
        setWelcomeScreenShow(false)

        return getDolphinProfile(token)
      })
      .catch(async (error) => {
        try {
          const welcomeScreenValue = await getLocalWelcomeScreenShowed()

          if (typeof welcomeScreenValue !== 'undefined' || welcomeScreenValue) {
            setWelcomeScreenShow(false)
          }
        } catch (error) {
          if (error instanceof Error && isWelcomeScreenError(error.message)) {
            console.info(error.message)
          } else {
            console.error(error)
          }
        }

        getDolphinProfile().catch((error) => {
          const description = 'Get Dolphin profile with empty token:'

          if (isDolphinError(error.message)) {
            console.info(description, error.message)
          } else {
            console.error(description, error)
          }
        })

        if (isAntyError(error.message) || isDolphinError(error.message)) {
          console.info(error.message)
        } else {
          throw error
        }
      })
      .finally(() => {
        getAntyProfile()
          .then(({ data }) => {
            setAntyProfile(data.data)
          })
          .catch((error) => {
            if (isAntyError(error.message)) {
              console.info(error.message)
            } else {
              throw error
            }
          })
          .finally(() => {
            setLoading(false)
          })
      })
  }, [])

  if (loading) {
    return <FullScreenCircularProgress />
  } else if (welcomeScreenShow) {
    return <WelcomeScreen />
  } else if (dolphinProfile) {
    return <Addition />
  } else {
    return <ConnectionCard />
  }
}

export default Anty
