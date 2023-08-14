import {
  useGetDolphinProfile,
  useDolphinProfileStore,
  isDolphinError,
} from 'entities/dolphin'
import ConnectionCard from 'features/connectionCard'
import { useEffect, useState } from 'react'
import FullScreenCircularProgress from 'shared/ui/fullScreenCircularProgress'
import Addition from 'widgets/addition'

const Dolphin = () => {
  const getDolphinProfile = useGetDolphinProfile()
  const dolphinProfile = useDolphinProfileStore((state) => state.profile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDolphinProfile()
      .catch((error) => {
        if (isDolphinError(error.message)) {
          console.info(error.message)
        } else {
          throw error
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <FullScreenCircularProgress />
  } else if (dolphinProfile) {
    return <Addition />
  } else {
    return <ConnectionCard />
  }
}

export default Dolphin
