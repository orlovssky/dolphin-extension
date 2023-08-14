import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { setLocalWelcomeScreenShowed } from '../lib/utils/localWelcomeScreen'
import useWelcomeScreenStore from '../model/store/useWelcomeScreenStore'

const url =
  'https://dolphin.ru.com/en/?utm_source=ecosystem&utm_medium=cpc&utm_campaign=dolphin_anty_app&utm_content=browser_extention'

const WelcomeScreen = () => {
  const { t } = useTranslation()
  const setShow = useWelcomeScreenStore((state) => state.setShow)

  return (
    <Card
      sx={{
        width: '100%',
        minHeight: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography color="primary" sx={{ fontWeight: 500, fontSize: 32 }}>
          {t('dolphin.extTitle')}
        </Typography>

        <Typography color="primary" sx={{ fontSize: 18 }}>
          {t('dolphin.extSubtitle')}
        </Typography>

        <Typography sx={{ fontSize: 18, mt: 2 }}>
          {t('dolphin.extDescription')}
        </Typography>

        <Link href={url} target="_blank" rel="noreferrer">
          {t('common.learnMore')}
        </Link>

        <Box sx={{ mt: 1, width: '50%', mx: 'auto' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => {
              setShow(false)
              setLocalWelcomeScreenShowed(true)
            }}
          >
            {t('common.ok')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default WelcomeScreen
