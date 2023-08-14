import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Alert from '@mui/material/Alert'
import CardContent from '@mui/material/CardContent'
import MuiCard from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import { useFacebookTokenStore } from 'entities/facebook'
import { useTranslation } from 'react-i18next'
import Card from 'shared/ui/card'
import { useSnackBarStore } from 'shared/ui/snackBar'

const FacebookTokenCard = () => {
  const { t } = useTranslation()
  const facebookToken = useFacebookTokenStore((state) => state.token)
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar)

  const handleClick = () => {
    navigator.clipboard.writeText(facebookToken).then(() => {
      openSnackBar({ message: t('common.copied'), severity: 'success' })
    })
  }

  if (!facebookToken) {
    return (
      <MuiCard
        variant="outlined"
        sx={{
          width: '100%',
          minHeight: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CardContent>
          <Alert severity="error" variant="filled">
            {t('facebook.tokenNotFound')}
          </Alert>
        </CardContent>
      </MuiCard>
    )
  } else {
    return (
      <Card title={t('facebook.token')} cardProps={{ variant: 'outlined' }}>
        <Alert
          severity="success"
          variant="outlined"
          action={
            <IconButton color="success" size="small" onClick={handleClick}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          }
        >
          {facebookToken}
        </Alert>
      </Card>
    )
  }
}

export default FacebookTokenCard
