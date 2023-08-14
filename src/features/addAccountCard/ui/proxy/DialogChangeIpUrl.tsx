import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const url = 'https://docs.dolphin.ru.com/view/9'

const DialogChangeIpUrl = ({
  isOpened,
  onClose,
  onAgree,
}: {
  isOpened: boolean
  onClose: () => void
  onAgree: () => void
}) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ru' ? 'ru' : 'en'

  return (
    <Dialog disableScrollLock open={isOpened} onClose={onClose}>
      <CardContent>
        <Typography variant="body2">
          {t('proxy.changeIpUrlDialogText1')}
        </Typography>
        <br />
        <Typography variant="body2">
          {t('proxy.changeIpUrlDialogText2')}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              window.open(`${url}?lang=${locale}`, '_blank')
            }}
          >
            {t('common.readArticle')}
          </Button>
        </Box>
      </CardContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.close')}</Button>
        <Button onClick={onAgree}>{t('proxy.useChangeIpUrl')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogChangeIpUrl
