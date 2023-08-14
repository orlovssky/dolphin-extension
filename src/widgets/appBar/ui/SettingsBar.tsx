import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { LocaleToggle } from 'entities/locale'
import { ThemeToggle } from 'entities/theme'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const SettingsBar = () => {
  const { t } = useTranslation()
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <IconButton color="inherit" onClick={() => setIsOpened(true)}>
        <SettingsOutlinedIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpened}
        disableScrollLock
        onClose={() => setIsOpened(false)}
      >
        <Box
          component="aside"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            minWidth: 200,
          }}
        >
          <Box component="header" sx={{ width: '100%', mb: 3 }}>
            <IconButton sx={{ mr: 1 }} onClick={() => setIsOpened(false)}>
              <ChevronRightIcon />
            </IconButton>

            <Typography
              component="span"
              variant="h6"
              sx={{ verticalAlign: 'middle' }}
            >
              {t('common.settings')}
            </Typography>
          </Box>

          <ThemeToggle toggleButtonGroupProps={{ sx: { mb: 2 } }} />
          <LocaleToggle />
        </Box>
      </Drawer>
    </>
  )
}

export default SettingsBar
