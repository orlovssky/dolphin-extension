import 'normalize.css'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { PaletteMode } from '@mui/material'
import { LOCALE, getLocalLocale, localeLocalizations } from 'entities/locale'
import { useThemeStore, getLocalThemeMode, THEME_MODE } from 'entities/theme'
import Anty from 'pages/anty'
import Dolphin from 'pages/dolphin'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo } from 'react'
import SnackBar from 'shared/ui/snackBar'
import { VITE_MODE } from 'shared/vite'
import AppBar from 'widgets/appBar'

import './assets/styles/fonts/noto-sans.css'

const App = () => {
  const { i18n } = useTranslation()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { mode: themeMode, setMode: setThemeMode } = useThemeStore(
    (state) => state,
  )

  const theme = useMemo(() => {
    let mode = prefersDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT

    if (themeMode !== THEME_MODE.SYSTEM) {
      mode = themeMode
    }

    return createTheme(
      {
        palette: {
          mode: mode as PaletteMode,
          ...(mode === THEME_MODE.LIGHT && {
            background: {
              default: grey[100],
            },
          }),
          ...(mode === THEME_MODE.DARK && {
            background: {
              default: grey[900],
            },
          }),
        },
        typography: {
          fontFamily: "'NotoSans', 'Roboto', sans-serif",
        },
      },
      localeLocalizations[i18n.language as LOCALE],
    )
  }, [themeMode, prefersDarkMode, i18n.language])

  useEffect(() => {
    getLocalThemeMode()
      .then((mode) => {
        setThemeMode(mode)
      })
      .catch((error) => {
        console.info(error.message)
      })

    getLocalLocale()
      .then((locale) => {
        i18n.changeLanguage(locale).then(() => {
          // do nothing
        })
      })
      .catch((error) => {
        console.info(error.message)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <AppBar />
      <Box
        component="main"
        sx={{
          p: 2,
          width: '500px',
          minHeight: '330px',
          boxSizing: 'border-box',
        }}
      >
        {import.meta.env.MODE === VITE_MODE.ANTY && <Anty />}
        {import.meta.env.MODE === VITE_MODE.DOLPHIN && <Dolphin />}
      </Box>
    </ThemeProvider>
  )
}

export default App
